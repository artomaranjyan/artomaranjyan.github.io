## <<entry.name>>

((_ if entry.date_string _))- <<entry.date*string>>
((* endif _))
((_ if entry.location _))- <<entry.location>>
((_ endif _))
((_ for item in entry.highlights \_))

- <<item>>
  ((_ endfor _))
