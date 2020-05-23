# Instructions

You have to create a plotting library that can render a few types of graphs.

## Mandatory Features

- Should at least have a `Bar` and `Line` chart feature.
- The data should be generic and can be fed by the user in a convenient form.
  - No data should be hard-coded.
- The API that you will expose to the developer is your choice.

## Extra Features

- Responsiveness

### Restrictions

- **You can use D3.js if you want**.
- You may want to just use `canvas` element on your own as well.
- You should not be using any extra libraries.
  - Apart from `eslint`, `prettier`, `babel` or other helper utilities.
- If your library does not have tests, it won't be evaluated.

# Solution

## Documentation 📚

### Usage

#### Step 1. Import NiceCharts

#### Step 2. Create chart object and pass it to <NiceChart/> as a prop name chartOptions.

```javascript
import React from 'react';
import NiceCharts from '../../components/nice-charts-lib/nice-charts.component';

const LineExample1 = () => {
  const options = {
    chartTitle: 'Wildlife Population',
    chartType: 'line',
    chartWidth: 650,
    chartHeight: 450,
    chartBackgroundColor: '#f3f3f3',
    axisY: {
      title: 'Population in crores',
      scale: 'auto',
      segments: 5,
    },
    axisX: {
      title: 'Years',
      scale: [2014, 2015, 2016, 2017, 2018, 2019],
    },
    data: [
      {
        label: 'Bears',
        color: 'red',
        data: [
          [2014, 5],
          [2015, 50],
          [2016, 85],
          [2017, 114],
          [2018, 140],
          [2019, 182],
        ],
      },
      {
        label: 'Dolphins',
        color: 'blue',
        data: [
          [2014, 140],
          [2015, 77],
          [2016, 25],
          [2017, 11],
          [2018, 34],
          [2019, 5],
        ],
      },
    ],
  };
  return (
    <div>
      <h3>Line chart Example</h3>
      <NiceCharts chartOptions={options} />
    </div>
  );
};

export default LineExample1;
```

### APIs provided by Nice Charts

| Property                    | isRequired |      Type      |   Default    | Help                                                                                               |
| --------------------------- | :--------: | :------------: | :----------: | :------------------------------------------------------------------------------------------------- |
| chartTitle                  |   false    |     string     |      ''      | This will be shown as chart title canvas top.                                                      |
| chartType                   |    true    |     string     |     none     | Currently supported 'line' & 'bar'                                                                 |
| chartWidth                  |   false    |     number     |     600      | Number is in pixel.                                                                                |
| chartHeight                 |   false    |     number     |     400      | Number is in pixel.                                                                                |
| chartBackgroundColor        |   false    |     string     |   #f3f3f3    | Enter vaild color, also can give color like 'grey', 'red'                                          |
|                             |            |                |              |                                                                                                    |
| <i><b>axisX & axisY</b></i> |    true    |     object     |     none     | Contains title, scale, and segments property                                                       |
| title                       |    ---     |      ---       |     ---      | Not implemented yet                                                                                |
| scale                       |    true    | string / array |     none     | Can have 'auto' for automatic axis scaling <br>or user can provide predefined axis scale as array. |
| segments                    |   false    |     number     |      5       | Desired number of axis segments.                                                                   |
|                             |            |                |              |                                                                                                    |
| <i><b>data</b></i>          |    true    |     array      |     none     | Array of object (contains label, color, data)                                                      |
| label                       |    ---     |      ---       |     ---      | Not implemented yet                                                                                |
| color                       |   false    |     string     | random color | Enter vaild color, also can give color like 'grey', 'red'                                          |
| data                        |    true    |     array      |     none     | Array of arrays (relative x,y co-ortinates)                                                        |
