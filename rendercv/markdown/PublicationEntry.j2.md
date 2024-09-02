## <<entry.title>> ((_ if entry.doi _))([<<entry.doi>>](<<entry.doi*url>>))((* elif entry.url _))([<<entry.url>>](<<entry.clean_url>>))((_ endif \_))

((_ if entry.date_string _))

- <<entry.date*string>>
  ((* endif \_))
- <<entry.authors|join(", ")>>
  ((_ if entry.journal _))
- <<entry.journal>>
  ((_ endif _))
