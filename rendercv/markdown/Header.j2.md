# <<cv.name>>'s CV

((_ if cv.phone _))

- Phone: <<cv.phone|replace("tel:", "")|replace("-"," ")>>
  ((_ endif _))
  ((_ if cv.email _))
- Email: [<<cv.email>>](mailto:<<cv.email>>)
  ((_ endif _))
  ((_ if cv.location _))
- Location: <<cv.location>>
  ((_ endif _))
  ((_ if cv.website _))
- Website: [<<cv.website|replace("https://","")|replace("/","")>>](<<cv.website>>)
  ((_ endif _))
  ((_ if cv.social_networks _))
  ((_ for network in cv.social_networks _))
- <<network.network>>: [<<network.username>>](<<network.url>>)
  ((_ endfor _))
  ((_ endif _))
