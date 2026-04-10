#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)

pick_arg <- function(flag, default = NULL) {
  idx <- match(flag, args)
  if (!is.na(idx) && idx < length(args)) return(args[[idx + 1L]])
  default
}

script_dir <- normalizePath(dirname(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1])), winslash = "/", mustWork = TRUE)
project_root <- normalizePath(file.path(script_dir, ".."), winslash = "/", mustWork = TRUE)

raw_dir_default <- file.path(project_root, ".cache", "interpol_raw")
raw_dir <- pick_arg("--raw-dir", raw_dir_default)
json_out <- pick_arg("--json-out", "")

if (!dir.exists(raw_dir)) stop(sprintf("missing raw dir: %s", raw_dir))

infer_freq <- function(dates) {
  dates <- sort(unique(as.Date(dates)))
  dates <- dates[!is.na(dates)]
  if (length(dates) < 3L) return("unknown")
  deltas <- as.numeric(diff(dates))
  deltas <- deltas[is.finite(deltas) & deltas > 0]
  if (length(deltas) == 0L) return("unknown")
  med <- stats::median(deltas)
  if (med <= 2) return("d")
  if (med >= 5 && med <= 9) return("w")
  if (med >= 26 && med <= 32) return("m")
  if (med >= 80 && med <= 100) return("q")
  if (med >= 360 && med <= 370) return("a")
  "unknown"
}

files <- sort(list.files(raw_dir, pattern = "\\.csv$", full.names = TRUE))
simple_count <- 0L
other_count <- 0L
freq_counts <- c(d = 0L, w = 0L, m = 0L, q = 0L, a = 0L, unknown = 0L)
other_examples <- list()

for (path in files) {
  hdr <- tryCatch(names(utils::read.csv(path, nrows = 0L, check.names = FALSE)), error = function(e) character())
  hdr <- trimws(as.character(hdr))
  simple <- length(hdr) >= 2L && identical(hdr[1:2], c("date", "value"))
  if (!simple) {
    other_count <- other_count + 1L
    if (length(other_examples) < 15L) {
      other_examples[[length(other_examples) + 1L]] <- list(file = basename(path), header = unname(hdr[seq_len(min(length(hdr), 6L))]))
    }
    next
  }

  simple_count <- simple_count + 1L
  df <- tryCatch(utils::read.csv(path, stringsAsFactors = FALSE), error = function(e) NULL)
  if (is.null(df) || !"date" %in% names(df)) {
    freq_counts[["unknown"]] <- freq_counts[["unknown"]] + 1L
    next
  }
  freq <- infer_freq(df$date[seq_len(min(nrow(df), 40L))])
  if (!freq %in% names(freq_counts)) freq <- "unknown"
  freq_counts[[freq]] <- freq_counts[[freq]] + 1L
}

to_json <- function(x) {
  if (is.atomic(x) && length(x) > 1L && is.null(names(x))) {
    return(sprintf("[%s]", paste(vapply(as.list(x), to_json, character(1)), collapse = ",")))
  }
  if (is.list(x) && !is.null(names(x))) {
    parts <- vapply(names(x), function(nm) sprintf('"%s":%s', nm, to_json(x[[nm]])), character(1))
    return(sprintf("{%s}", paste(parts, collapse = ",")))
  }
  if (is.list(x)) {
    return(sprintf("[%s]", paste(vapply(x, to_json, character(1)), collapse = ",")))
  }
  if (is.character(x)) {
    esc <- gsub("\\\\", "\\\\\\\\", x)
    esc <- gsub('"', '\\"', esc, fixed = TRUE)
    esc <- gsub("\n", "\\\\n", esc, fixed = TRUE)
    return(sprintf('"%s"', esc))
  }
  if (is.numeric(x) || is.integer(x)) {
    if (length(x) == 1L) return(as.character(x))
    return(sprintf("[%s]", paste(as.character(x), collapse = ",")))
  }
  if (is.logical(x)) {
    return(ifelse(x, "true", "false"))
  }
  if (is.null(x)) return("null")
  to_json(as.character(x))
}

report <- list(
  raw_dir = normalizePath(raw_dir, winslash = "/", mustWork = FALSE),
  csv_files = length(files),
  simple_date_value_files = unname(simple_count),
  nonstandard_files = unname(other_count),
  simple_freq_counts = as.list(freq_counts),
  nonstandard_examples = other_examples
)

json_text <- paste0(to_json(report), "\n")
cat(json_text)

if (nzchar(json_out)) {
  dir.create(dirname(json_out), recursive = TRUE, showWarnings = FALSE)
  writeLines(json_text, con = json_out)
}
