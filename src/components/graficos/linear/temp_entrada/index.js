import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';


class temp_entrada extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{}
        }
    }

    componentDidMount(){
        this.getChartData();
    }

    
    getChartData(){
        axios.get("https://ro-back-sql.azurewebsites.net/data").then(res => {
       
            const value = res.data;
            let novo_array = value["result"];
            let novo_array_date = [];
            let novo_array_temp = [];
           
            // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
            novo_array.map(function(i){
                novo_array_date.push({
                    "Date": i.Date,
                   
                });
            })

            novo_array.map(function(i){
                novo_array_temp.push({
               
                    "FeeTemperature": i.FeeTemperature,
                });
            })
        
            //pega apenas o valor da array de objeto transformando em uma array
            let FeeTemperatureArray1 = novo_array_temp.map(a => a.FeeTemperature);
            let DateArray1 = novo_array_date.map(a => a.Date);
        
            //converte a array de string em nnumeros
            let FeeTemperatureArray2 = FeeTemperatureArray1.map(Number);
            let DateArray2 = DateArray1;


            this.setState({
                chartData:{
                    labels: DateArray2,
                    datasets: [
                        {
                            label: "Temperatura Entrada (ºC)",
                            data: FeeTemperatureArray2,
                            lineTension: 0.1,
                            fill:false,
                            backgroundColor: 'rgba(216,216,216,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                        }
                    ]
                }
            });
        });
    }



    render(){
        return(
            <div className = "temp_entrada">
                
                <Line
                    data = {this.state.chartData}
                    width = {1200}
                    height = {400}
                    options={{
                        title:{
                            display: true,
                            text: 'Temperatura Entrada (ºC)',
                            fontSize: 30
                        },
                        legend:{
                            display:false,
                            position: 'top',
                        },
                        scales:{
                            yAxes:[{
                                ticks: {
                                    beginAtZero: false,
                                }
                            }]
                        }
                    }}
                 />
                
            </div>
        )
    }
}

export default temp_entrada;