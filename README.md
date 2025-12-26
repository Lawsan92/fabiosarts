# Fabiosarts.com

### <a href='https://www.fabiosarts.com/'>Visit</a> this talented artist's website to see his works

| desktop                                                                                                                           | mobile                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| <img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1763688349/portfolio/Screenshot_2025-11-20_at_19.25.43_vamjgf.jpg'/> | <img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1764467203/iPhone-12-PRO-www.fabiosarts.com_m81cdd.png'/> |

### Features

- Spring Animations
- Cloudinary API integration for gallery assets
- custom image scaler module
- backend visitor analytics

### API docs

`-GET /visits`

Returns a JSON object with all webpage visitor analytics. \* (This requires an admin password embedded in the HTTP authorization header to access, since this contains sensitive information.)

`RESPONSE (= JSON object)`

```
{
    "visits":
    [
        {
            "ip": "XXX.XX.X.XX",
            "country": "US",
            "city": "Austin",
            "lat": XX.XXXX,
            "long": XX.XXXX,
            "first_visit": "Thu Dec 25 2025 11:20:23 GMT-0600 (Central Standard Time)",
            "last_visit": "Thu Dec 25 2025 23:04:48 GMT-0600 (Central Standard Time)",
            "visit_count": 4,
            "session_time": 4,
            "pages": [
                "0: [\"{/}\", time: 39], visit_date: Thu Dec 25 2025 11:20:23 GMT-0600 (Central Standard Time)]",
                "1: [\"{/,/gallery/early%20works#Trolley,/gallery/early%20works,/gallery/abstract#Expanding%20Universe,/gallery/abstract,/gallery/abstract#ID,/gallery/abstract#Light%20Bulb,/gallery/abstract#Maya%20God,/gallery/abstract#Puppies,/gallery/abstract#Trolley,/gallery/abstract#Ego%20Sum,/gallery/abstract#Upswing,/gallery/abstract#Window,/gallery/abstract#Downtown}\", session_time: 18, visit_date: Thu Dec 25 2025 11:21:03 GMT-0600 (Central Standard Time)]",
                "2: [\"{/gallery/abstract#Expanding%20Universe}\", session_time: 1, visit_date: Thu Dec 25 2025 11:21:22 GMT-0600 (Central Standard Time)]",
                "3: [\"{/gallery/abstract#Expanding%20Universe}\", session_time: 3, visit_date: Thu Dec 25 2025 11:21:23 GMT-0600 (Central Standard Time)]",
            ]
        }
        ...
    ]
}
```

### Tech stack:

![JavaScript](https://img.shields.io/badge/JavaScript-grey?logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-grey?logo=nodedotjs)
![React](https://img.shields.io/badge/React-white?logo=react)
![Cloudinary](https://img.shields.io/badge/Cloudinary-black?logo=cloudinary)
