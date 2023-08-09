## 1. General stop page updates:

- now we have 3 types of time tables:

  - time table groupped by transport types
    screenshots:
  - time table for respective transport type and groupped by lines
    screenshots:
  - time table for respective transport type and line
    screenshots:

- also stop pages can be by single or by sub-stop.
  - stop page by stop - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof` and otheres from stop:
    - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof/sbahn`
    - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof/sbahn/s7`
  - stop page by sub-stop - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof/sub/berlin-hbf-nord` and others from sub stop:
    - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof/sub/berlin-hbf-nord/sbahn`
    - `/haltestelle/deutschland/berlin/berlin/berlin-hauptbahnhof/sub/berlin-hbf-nord/sbahn/s7`

---13

## 2. Updated model for `transport_info`:

```ts
interface TransportInfo {
  line?: string;
  transport: TransportsTypes;
  scheme?: string;
  color?: string;
  text_color?: string;
  short_line?: string;
  // NEW fields
  relation?: string;
  group_transport_type?: TransportsTypes;
}
```

- `group_transport_type` - is for `Fern- & Regio` type. Which includes different transports like `re, ice, flixtrain ...`, Boris know which one should be included.
- `relation` - is for generating `generic` line page. It's can be `scheme`, `group_transport_type`, `city` etc. Boris work on it.

for example if it is `Group type`:
colors are real, For flix use second color combination for all others groupped items 1 combination;

```js
const transport_type = {
  line: 'ICE',
  transport: 'ice',
  color: '#0454A3',
  text_color: '#ffffff',

  relation: 'regional_long-distance' // Boris think about short name for this type,
  group_transport_type: 'regional_long-distance'
}

const transport_type2 = {
  line: 'FLX',
  transport: 'flixtrain',
  color: '#73D700',
  text_color: '#ffffff',

  relation: 'regional_long-distance' // Boris think about short name for this type,
  group_transport_type: 'regional_long-distance'
}
```

---

## 3. Updates in `/api/haltestelle/info`:

#### Request params:

```ts
type StopInfoFetchParams = {
  name: string;
  city: string;
  state: string;
  country: string;

  primary_stop_title?: string;
  transport_type?: string;
  line?: string;
};
```

#### response additional fields:

```ts
interface StopInfoResponse extends PreviosStopInfoResponse {
  current_transport_info?: TransportInfo;
  available_direction_filter?: { direction: string }[];
  available_transports_filter?: TransportInfo[];

  primary_stop_short_title?: string;
  primary_stop_title?: string;
}
```

**Based on incoming `StopInfoFetchParams` to BE responses can vary:**

- `primary_stop_short_title`, `primary_stop_title` - are for the requests with `primary_stop_title` parameter.
- `current_transport_info` - availalbe for the requsts `transport_type` or `transport_type & line` exists;
  if only transport type exists
- `available_transports_filter`- can be availalbe for all requests;
- `available_direction_filter` - availalbe for the requsts with `line`

**Examples:**

1.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
```

- response:
  No need anything in `available_transports_filter` only `transport`

```js
const response: {
  ...rest_untouched_fields,
  stop_name: 'Berlin Hauptbahnhof',
  available_transports_filter: [
  {
    transport: 'regional_long-distance',
  },
  {
    transport: 'sbahn'
  },
  {
    transport: 'ubahn'
  }
  ];
}
```

2.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn' <<<
```

- response:

```js
const response: {
  ...rest_untouched_fields,
  current_transport_info: {
    transport: 'sbahn'
  },
  available_transports_filter: [
  {
    transport: 'sbahn',
    line: 'S7',
    scheme: 'MVV',
    color: '....',
    text_color: '...'
  },
  {
   transport: 'sbahn',
    line: 'S5',
    scheme: 'MVV',
    color: '....',
    text_color: '...'
  },
  {
   transport: 'sbahn',
    line: 'S2',
    scheme: 'MVV',
    color: '....',
    text_color: '...'
  }
  ];
}
```

3.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn', <<<
  line: 's7', <<<
```

- response:

```js
const response: {
  ...rest_untouched_fields,
    current_transport_info: {
      transport: 'sbahn',
      line: 'S7',
      scheme: 'MVV',
      color: '....',
      text_color: '...'
  },

  available_transports_filter: [ // << can be ommitted for current response type (optional)
  {
    transport: 'sbahn',
    line: 'S7',
    scheme: 'MVV',
    color: '....',
    text_color: '...'
  },
  ],
  available_direction_filter: [{ direction: 'Mangfallplatz' }, { direction: 'Olympia Einkaufszentrum' }]
}
```

4. For Sub-Stops the same flow as above but only

- request contains `primary_stop_title`:

```js
  name: 'berlin-hbf-nord',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  primary_stop_title: 'berlin-hauptbahnhof', <<<
  transport_type: 'sbahn',
  line: 's7',
```

- and response containse `primary_stop_short_title` and `primary_stop_title`

```js
const response: {
  ...rest_untouched_fields,
  stop_name: "Berlin Hbf (Nord)",
  short_title: "Berlin Hbf (Nord)",

  primary_stop_short_title: "Berlin Hauptbahnhof",
  primary_stop_title: "Berlin Hauptbahnhof",

  available_transports_filter: [
  {
    transport: 'sbahn',
    line: 'S7',
    scheme: 'MVV',
    color: '....',
    text_color: '...'
  },
  ],
  available_direction_filter: [{ direction: 'Mangfallplatz' }, { direction: 'Olympia Einkaufszentrum' }]
}
```

---

## 4. New timetable API (we call it stations api);

- Timetable request params

```ts
//Timetable request params:
interface StationTableFetchParams {
  name: string;
  city: string;
  state: string;
  country: string;

  primary_stop_title?: string;
  transport_type?: string;
  line?: string;

  date?: string;
  time?: string;
  type: string; // 'now' | 'departure' | 'arrival' | 'last'
}
```

- Timetable response:

```ts
interface StationPageDataType {
  transports: StationTimeSectionTable[];
}
```

Sub interfaces for response:

```ts
interface StationTimeSectionTable {
  segment_transport: TransportInfo; // Transport info interface from top of this document
  segments: StationSegments[];
}

interface StationSegments {
  transport_info: TransportInfo;
  direction: string;
  platform?: string;
  departure_info: {
    plan_date: string; //  2023-07-17T11:25:00.000
    actual_date?: string; // 2023-07-17T11:26:00.000
  };
  interruption_type?: "delayed" | "canceled";

  // not sure yet how we going to get next results
  // for one timetable segment. For now we just add `next_token`.
  // Will see later when you dive in it.
  next_token?: string;
}
```

**Based on incoming params to BE responses can vary:**

**Examples**:

1.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',

  time: '12:30',
  date: '22.09.2023',
  type: 'departure',
```

- response:
  Results `transports` are for all available `transport_types` for respective station.

```js
{
  transports: [
    {
      segment_transport: {
        transport: "ubahn",
      },
      segments: [
        {
          departure_info: {
            plan_date: "2023-08-09T16:25:06.274",
            actual_date: "2023-08-09T16:35:06.274",
          },
          direction: "Olympia Einkaufszentrum",
          transport_info: {
            line: "U2",
            transport: "ubahn",
            scheme: "VBB",
            color: "#fff",
            text_color: "rgba(0, 0, 0, 0.54)",
          },
          interruption_type: "delayed",
          platform: "",
        },
        ...
      ],
    },
    {
      segment_transport: {
        transport: "regional_long-distance",
      },
      segments: [
        {
          departure_info: {
            plan_date: "2023-08-09T16:25:06.274",
            actual_date: "2023-08-09T16:35:06.274",
          },
          direction: "Mangfallplatz",
          transport_info: {
            line: "ICE",
            transport: "ice",
            color: '#0454A3',
            text_color: '#ffffff',
            group_transport_type: 'regional_long-distance'
          },
        },
        {
           departure_info: {
            plan_date: "2023-08-09T16:25:06.274",
            actual_date: "2023-08-09T16:35:06.274",
          },
          direction: "Mangfallplatz",
          transport_info: {
            line: "FLX",
            transport: "flixtrain",
            color: '#73D700',
            text_color: '#ffffff',
            group_transport_type: 'regional_long-distance'
          },
        }
        ...
      ],
    },

  ]
}
```

2.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn', <<<

  time: '12:30',
  date: '22.09.2023',
  type: 'departure',
```

- response:
  Results only for `S-bahn`. Each `transports` item is a possible line for `Sbahn`.
  Where `segments` are result for respective line with different departures times in any direction

```js
{
  transports: [
    {
      segment_transport: {
        transport: "sbahn",
        line: "S2",
        color: "....",
        text_color: "...",
        scheme: "...",
      },
      segments: [
        {
          departure_info: {
            plan_date: "2023-08-09T16:25:06.274",
            actual_date: "2023-08-09T16:35:06.274",
          },
          direction: "Mangfallplatz",
          transport_info: {
            line: "S2",
            transport: "sbahn",
            scheme: "VBB",
            color: "#fff",
            text_color: "rgba(0, 0, 0, 0.54)",
          },
          interruption_type: "delayed",
          platform: "",
        },
        ...
      ],
    },
    {
      segment_transport: {
        transport: "sbahn",
        line: "S7",
        color: "....",
        text_color: "...",
        scheme: "...",
      },
      segments: [
        {
          departure_info: {
            plan_date: "2023-08-09T16:25:06.274",
            actual_date: "2023-08-09T16:35:06.274",
          },
          direction: "Olympia Einkaufszentrum",
          transport_info: {
            line: "S7",
            transport: "sbahn",
            scheme: "VBB",
            color: "#fff",
            text_color: "rgba(0, 0, 0, 0.54)",
          },
          ...
        },
        ...
      ],
    },
  ];
}
```

3.

- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn', <<<
  line: 's3', <<<
```

- response (For this kind of reqeust `transports` always with 1 element only):
  Only results for `S-bahn S3` where `segments` are items with different departure times in any direction;

```js
{
  transports: [{
    segment_transport: {
      transport: "sbahn",
      line: "S3",
      color: "....",
      text_color: "...",
      scheme: "...",
  },
  segments: [
    {
      departure_info: {
        plan_date: "2023-08-09T16:25:06.274",
        actual_date: "2023-08-09T16:35:06.274",
      },
      direction: "Mangfallplatz",
      transport_info: {
        line: "S3",
        transport: "sbahn",
        scheme: "VBB",
        color: "#fff",
        text_color: "rgba(0, 0, 0, 0.54)",
      },
      interruption_type: "delayed",
      platform: "",
    },
    ...
  ],
  }]
}

```

_The behavior for sub-stop is the same. Only Difference in request params `primary_stop_title` will be added_

---

## 5. Station table additional results API:

- Request params:

```ts
interface CommomStationFetchParams {
  name: string;
  city: string;
  state: string;
  country: string;

  primary_stop_title?: string;
  transport_type?: string;
  line?: string;
}
```

- Additional info response:

```ts
interface AdditionalStationsResponse {
  nearest_connections?: AdditionalStationItem[];
  sub_stations?: AdditionalStationItem[];

  local_popular_connections?: AdditionalStationItem[];
  intercity_popular_connections?: AdditionalStationItem[];

  available_connections?: TransportInfo[];
}
```

Nested interfaces:

```ts
interface AdditionalStationItem {
  departure_info: StopPointInfo;

  transport_list?: TransportsTypes[]; // ['sbahn', 'ubahn', 'bus' ...]
  arrival_info?: StopPointInfo;
  additional_info?: {
    distance?: number;
    price_from?: number;
    duration?: string;
  };
}

type StopPointInfo = {
  stop_title: string;
  short_title: string;
  city_name: string;
  country_name: string;
  state_name: string;
  place_type: "city" | "stop" | "street";

  // stop exist if it is sub-station
  primary_stop_title?: string;
  primary_stop_short_title?: string;
};
```

**Based on incoming params to BE responses can vary:**
**Examples**

1.

- request

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
```

- response

```js
const response = {
  intercity_popular_connections: [
    {
      departure_info: {
        city_name: "Berlin",
        country_name: "Deutschland",
        short_title: "Berlin",
        state_name: "Berlin",
        stop_title: "Berlin Hauptbahnhof",
        place_type: "city",
      },
      arrival_info: {
        city_name: "München",
        country_name: "Deutschland",
        short_title: "München",
        state_name: "Bayern",
        place_type: "city",
        stop_title: "München",
      },
      additional_info: {
        duration: "03:40",
        price_from: 4700,
      },
    },
    //...
  ],
  local_popular_connections: [
    {
      departure_info: {
        city_name: "Berlin",
        country_name: "Deutschland",
        short_title: "Berlin",
        state_name: "Berlin",
        stop_title: "Berlin Hauptbahnhof",
        place_type: AutocompleteItemTypes.city,
      },
      arrival_info: {
        city_name: "München",
        country_name: "Deutschland",
        short_title: "München",
        state_name: "Bayern",
        stop_title: "München",
        place_type: AutocompleteItemTypes.city,
      },
      additional_info: {
        duration: "00:48",
      },
    },
    //...
  ],

  // If station have sub stations then this field exist
  // if not then `nearest_connections`
  sub_stations: [
      departure_info: {
        city_name: 'Berlin',
        country_name: 'Deutschland',
        short_title: 'Berlin Hbf (Nord)',
        state_name: 'Berlin',
        stop_title: 'Berlin Hbf (Nord)',
        place_type: 'city',

        primary_stop_title: 'Berlin Hauptbahnhof',
        primary_stop_short_title: 'Berlin',
      },
      transport_list: [
        'ubahn',
        'sbahn',
        'bus',
      ],
      //...
  ],

  // or nearest_connections instead of `sub_stations`:
  nearest_connections: [
    {
      departure_info: {
        city_name: 'Berlin',
        country_name: 'Deutschland',
        short_title: 'Berlin Hauptbahnhof',
        state_name: 'Berlin',
        stop_title: 'Berlin Hauptbahnhof',
        place_type: 'city',
      },
      transport_list: [
        'ubahn',
        'sbahn',
        'bus',
      ],
    }
  ]
};
```

2. 
- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn', << 
```

- response:
All additional available transports for respective station. 
```js

const response = {
  available_connections: [
    {
      transport: 'regional_long-distance'
    },
    {
      transport: 'ubahn'
    },
    {
      transport: 'bus'
    }
    //...
  ]
}

```


3. 
- request:

```js
  name: 'berlin-hauptbahnhof',
  city: 'berlin',
  state: 'berlin',
  country: 'deutschland',
  transport_type: 'sbahn', <<<
  line: 's3', <<< 
```

- response:
All additional available lines for respective station and respective transport type. 
```js

const response = {
  available_connections: [
    {
      transport: 'sbahn'
      line: 's7',
      color: '...',
      text_color: '...',
      scheme: '....'
    },
    {
      transport: 'sbahn'
      line: 's4',
      color: '...',
      text_color: '...',
      scheme: '....'
    },
    {
      transport: 'sbahn'
      line: 's8',
      color: '...',
      text_color: '...',
      scheme: '....'
    }
    //...
  ]
}

```
