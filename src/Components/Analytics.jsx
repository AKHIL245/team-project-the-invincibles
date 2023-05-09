import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import './Analytics.css';

export function Analytics() {
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState('daily');
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/empdashboard');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const registrationsByDate = data.reduce((acc, curr) => {
          const registrationDate = curr.date;
          if (!acc[registrationDate]) {
            acc[registrationDate] = 1;
          } else {
            acc[registrationDate]++;
          }
          return acc;
        }, {});

        const chartData = {
          labels: Object.keys(registrationsByDate),
          datasets: [
            {
              label: 'Number of Registrations',
              data: Object.values(registrationsByDate),
              backgroundColor: Object.keys(registrationsByDate).map((date, index) => {
                const colors = ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'];
                return colors[index % colors.length];
              }),
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          responsive: true, // Allow the chart to be responsive
          maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };

        const ctx = document.getElementById('myChart');
        setChart(new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions,
        }));
      } catch (error) {
        console.error(error);
      }

      // Fetch data for hours spent
      const hoursResponse = await fetch('http://localhost:3000/empdashboardhoursspent');
      const visitorsData = await fetch('http://localhost:3000/visitoranalytics');
      const visitorData=await visitorsData.json();
      if (!hoursResponse.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Entries",visitorData);
      const hoursData = await hoursResponse.json();

    //weekday and weeekend starting
      const weekData=visitorData;
      const weekdayDates = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        let weekdayVisits = 0;
        let weekendVisits = 0;
        for (const date in weekData) {
          const day = new Date(date).toLocaleString("en-us", { weekday: "short" });
          if (weekdayDates.includes(day)) {
            weekdayVisits=weekdayVisits+weekData[date];
          } else {
            weekendVisits=weekendVisits+weekData[date];
          }
        }
        console.log("weekdayVisits",weekdayVisits,weekendVisits);
    //weekday and weeekend ending
  //weeek data staring***********
  const  entries  = hoursData;
  console.log("Entries",entries);
  const currentDate = new Date();
  const startingDate = new Date("2000-01-01");
      
  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startingDate && entryDate <= currentDate;
  });

  const timeSpentByWeek = filteredEntries.reduce((acc, entry) => {
    const entryDate = new Date(entry.date);
    const weekStart = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate() - entryDate.getDay());
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    const weekKey = `${weekStart.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;
    const checkInTime = new Date(`2000-01-01T${entry.checkintime}`);
    const checkOutTime = new Date(`2000-01-01T${entry.checkouttime}`);
    const timeSpent = (checkOutTime - checkInTime) / 1000 / 60 / 60;

    if (!acc[weekKey]) {
      acc[weekKey] = timeSpent;
    } else {
      acc[weekKey] += timeSpent;
    }

    return acc;
  }, {});
  console.log("timeSpentByWeek",timeSpentByWeek)
// week data ending

// monthly data Starting

const currentDateTime = new Date();
const filteredEntriesByMonth = entries.filter(entry => {
  const entryDate = new Date(entry.date);
  return entryDate >= startingDate && entryDate <= currentDate;
});
const timeSpentByMonth = filteredEntriesByMonth.reduce((acc, entry) => {
  const entryDateTime = new Date(entry.date);
  const monthKey = `${entryDateTime.getFullYear()}-${(entryDateTime.getMonth() + 1).toString().padStart(2, '0')}`;
  const checkInDateTime = new Date(`2000-01-01T${entry.checkintime}`);
  const checkOutDateTime = new Date(`2000-01-01T${entry.checkouttime}`);
  const timeSpent = (checkOutDateTime - checkInDateTime) / 1000 / 60 / 60;

  if (!acc[monthKey]) {
    acc[monthKey] = timeSpent;
  } else {
    acc[monthKey] += timeSpent;
  }

  return acc;
}, {});
console.log("timeSpentByMonth",timeSpentByMonth)
// monthly data starting
        const hoursByDate = hoursData.reduce((acc, curr) => {
        const checkInDate = curr.checkintime.split('T')[0];
        const checkindate=curr.date;
        console.log("checkInDate",checkInDate);
        const startDate = new Date(`2000-01-01T${curr.checkintime}`);
        const endDate = new Date(`2000-01-01T${curr.checkouttime}`);
        

    // Calculate the time difference in milliseconds
        const difference = endDate - startDate;
        
    // Convert the time difference to hours and minutes
      const hoursSpent = (difference / 1000 / 60 / 60);
      console.log("checkinouttime",startDate,"    ",endDate, " ", difference,"  ",hoursSpent); 
        // const checkInHour = parseInt(curr.checkintime.split('T')[1].split(':')[0]);
        // const checkOutHour = parseInt(curr.checkouttime.split('T')[1].split(':')[0]);
        // console.log("checkInHour",checkInHour);
        // console.log("checkOutHour",checkOutHour);
        // const hoursSpent = checkOutHour - checkInHour;

        if (!acc[checkindate]) {
          acc[checkindate] = hoursSpent;
        } else {
          acc[checkindate] += hoursSpent;
        }
        return acc;
      }, {});
      //console.log(hoursByDate)
      const hoursChartData = {
        labels: Object.keys(hoursByDate),
        datasets: [
          {
            label: 'Hours Spent in the Gym',
            data: Object.values(hoursByDate),
              backgroundColor: Object.keys(hoursByDate).map((date, index) => {
                const colors = ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'];
                return colors[index % colors.length];
              }),
              borderColor: 'black',
              borderWidth: 1,
          },
        ],
      };

      const hoursChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      const hoursCtx = document.getElementById('hoursChart');
        new Chart(hoursCtx, {
          type: 'pie',
          data: hoursChartData,
          options: hoursChartOptions,
        });


        const weeklyChartData = {
          labels: Object.keys(timeSpentByWeek),
          datasets: [
            {
              label: 'Hours Spent in the Gym',
              data: Object.values(timeSpentByWeek),
                backgroundColor: Object.keys(timeSpentByWeek).map((date, index) => {
                  const colors = ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'];
                  return colors[index % colors.length];
                }),
                borderColor: 'black',
                borderWidth: 1,
            },
          ],
        };
  
        const weeklyChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };
  
        const weeklyCtx = document.getElementById('weeksChart');
          new Chart(weeklyCtx, {
            type: 'doughnut',
            data: weeklyChartData,
            options: weeklyChartOptions,
          });

          // chart for monthly
          const montlyChartData = {
            labels: Object.keys(timeSpentByMonth),
            datasets: [
              {
                label: 'Hours Spent in the Gym',
                data: Object.values(timeSpentByMonth),
                  backgroundColor: Object.keys(timeSpentByMonth).map((date, index) => {
                    const colors = ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'];
                    return colors[index % colors.length];
                  }),
                  borderColor: 'black',
                  borderWidth: 1,
              },
            ],
          };
    
          const monthlyChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
    
          const monthlyCtx = document.getElementById('monthlyChart');
            new Chart(monthlyCtx, {
              type: 'polarArea',
              data: montlyChartData,
              options: monthlyChartOptions,
            });
          // chart for monthly

          // Chart for Weekday and Weekends

          const weekendChartData = {
            labels: ['Weekday', 'Weekend'],
            datasets: [
              {
                label: 'Number of visitors',
                data: [weekdayVisits,weekendVisits],
                backgroundColor: ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'],
                  borderColor: 'black',
                  borderWidth: 1,
              },
            ],
          };
    
          const weekendChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
    
          const weekendCtx = document.getElementById('weekendChart');
            new Chart(weekendCtx, {
              type: 'pie',
              data: weekendChartData,
              options: weekendChartOptions,
            });

          // Chart for weekday and weekend

          // Chart for Visitors Data Starting
          const visitorsChartData = {
            labels: Object.keys(visitorData),
            datasets: [
              {
                label: 'Number of visitors',
                data: Object.values(visitorData),
                backgroundColor: Object.keys(visitorData).map((date, index) => {
                  const colors = ['orange', 'purple', 'green', 'maroon', 'blue', 'red','sienna','brown'];
                  return colors[index % colors.length];
                }),
                  borderColor: 'black',
                  borderWidth: 1,
              },
            ],
          };
    
          const visitorsChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
    
          const visitorsCtx = document.getElementById('visitorsChart');
            new Chart(visitorsCtx, {
              type: 'bar',
              data: visitorsChartData,
              options: visitorsChartOptions,
            });


           // Chart for Visitors Data Ending

        
    } 


    fetchData();

    // Clean up the chart when the component unmounts
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
}, []);
  // const handleChartTypeChange = (event) => {
  //   setChartType(event.target.value);
  // };
  return (
    <div className="chart-container" style={{marginTop:"140px"}}>
      {/* <br></br><br></br><br></br><br></br><br></br> */}
      <div className='chart-grid'>
      <div>
      <h3 className="chart-title">Classes and Enrollment by Date</h3>
      <canvas id="myChart" ></canvas>
      </div>
      <div>
      <h3 className="chart-title">Hours spent in the Gym by Date</h3>
      <canvas id="hoursChart" ></canvas>
      </div>
      <div>
      <h3 className="chart-title">Hours spent in the Gym by Week</h3>
      <canvas id="weeksChart" ></canvas>
      </div>
      <div>
      <h3 className="chart-title">Hours spent in the Gym by Month</h3>
      <canvas id="monthlyChart" ></canvas>
      </div>
      <div>
      <h3 className="chart-title">Number of visitors on Weekdays and Weekends </h3>
      <canvas id="weekendChart" ></canvas>
      </div>
      <div>
      <h3 className="chart-title">Number of visitors each day</h3>
      <canvas id="visitorsChart" ></canvas>
      </div>
      </div>
    </div>
  );
};

export default Analytics;
