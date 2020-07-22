import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';


class rejeicao_sal_normalizada_permeado extends Component{
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
     
            //pegando valor do api - uri - localhost
            const value = res.data;

            //adentrando o campo [result]
            let novo_array = value["result"];

            //splitando os dados em: Data, Dados e ConcentratedPressure
            //-----------------------------------------------__________--------------------------------------   

            let i = 0;
            let j = 0;

            //array novo só com os dados
            let FeedPressure_array = [];
 
            novo_array.map(function(i){
             FeedPressure_array.push({
                     "FeedPressure": i.FeedPressure,
                 })
                 return FeedPressure_array;
             })
 
             //array novo só com as datas (timestamp original em Unix/Epoch Time)
             let data_array= [];
 
             novo_array.map(function(i){
                 data_array.push({
                         "data": i.Date,
                     })
                     return data_array;
                 })
 
              //array novo para selecionar concentrate pressre 
              let ConcentratedPressure_array = [];
 
             novo_array.map(function(i){
                 ConcentratedPressure_array.push({
                         "ConcentratedPressure": i.ConcentratedPressure,
                     })
                     return ConcentratedPressure_array;
                 })

                 let FeedConductivity_array = [];
                 novo_array.map(function(i){
                    FeedConductivity_array.push({
                        "FeedConductivity": i.FeedConductivity,
                    });
                })


                let PermConductivity_array = [];
                novo_array.map(function(i){
                    PermConductivity_array.push({
                        "PermConductivity": i.PermConductivity,
                    });
                })


                let PermFlow_array = [];
                novo_array.map(function(i){
                    PermFlow_array.push({
                        "PermFlow": i.PermFlow,
                    });
                })


                let ConcentratedFlow_array = [];
                novo_array.map(function(i){
                    ConcentratedFlow_array.push({
                        "ConcentratedFlow": i.ConcentratedFlow,
                    });
                })


                let FeedFlow_array = [];
                novo_array.map(function(i){
                    FeedFlow_array.push({
                        "FeedFlow": i.FeedFlow,
                    });
                })


                let FeeTemperature_array = [];
                novo_array.map(function(i){
                    FeeTemperature_array.push({
                        "FeeTemperature": i.FeeTemperature,
                    });
                })



           //manipulando o array de dados
             let FeedPressure_array_1 = FeedPressure_array.map(a => a.FeedPressure);  
             let ConcentratedPressure_array_1 = ConcentratedPressure_array.map(a => a.ConcentratedPressure);  
             let FeedConductivity_array_1 = FeedConductivity_array.map(a => a.FeedConductivity); 
             let PermConductivity_array_1 = PermConductivity_array.map(a => a.PermConductivity); 
             let PermFlow_array_1 = PermFlow_array.map(a => a.PermFlow); 
             let ConcentratedFlow_array_1 = ConcentratedFlow_array.map(a => a.ConcentratedFlow); 
             let FeedFlow_array_1 = FeedFlow_array.map(a => a.FeedFlow); 
             let FeeTemperature_array_1 = FeeTemperature_array.map(a => a.FeeTemperature); 
             let data_array_1 = data_array.map(a => a.data);    
 
              //converte a array de string em nnumeros
              let FeedPressure_array_2 = FeedPressure_array_1.map(Number);
              let ConcentratedPressure_array_2 = ConcentratedPressure_array_1.map(Number);
              let FeedConductivity_array_2 = FeedConductivity_array_1.map(Number);
              let PermConductivity_array_2 = PermConductivity_array_1.map(Number);
              let PermFlow_array_2 = PermFlow_array_1.map(Number);
              let ConcentratedFlow_array_2 = ConcentratedFlow_array_1.map(Number);
              let FeedFlow_array_2 = FeedFlow_array_1.map(Number);
              let FeeTemperature_array_2 = FeeTemperature_array_1.map(Number);
        
        
            //Dados limpos e finalizados
            //-----------------------------------------------__________--------------------------------------   

            //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = FeedPressure_array_2.length;
    
    let FeedPressure_value = FeedPressure_array_2[k-1];
    let ConcentratedPressure_value = ConcentratedPressure_array_2[k-1];
    let FeedConductivity_value = FeedConductivity_array_2[k-1];
    let PermConductivity_value = PermConductivity_array_2[k-1];
    let PermFlow_value = PermFlow_array_2[k-1];
    let ConcentratedFlow_value = ConcentratedFlow_array_2[k-1];
    let FeedFlow_value = FeedFlow_array_2[k-1];
    let FeeTemperature_value = FeeTemperature_array_2[k-1];

    

    //---------------------------CÁLCULO DA NORMALIZAÇÃO--------------------------------------
    
   
   //----------------------------------------DEFINIÇÃO DE VARIÁVEIS MANUAIS-------------------------------

   let pressao_permeado = 0;
   let pressao_net_driving_zero = 0;
   let Temp_correcao_zero = 1.047;
   let conc_media_calculada_entrada_zero = 0;
   let vazao_permeado_zero = 0;
   let TDS_entrada_calculado_zero = 132.958;


    //---------------------------CÁLCULO DA NORMALIZAÇÃO--------------------------------------
    
    //DIFFERENTIAL PRESSURE

    let PressaoDif_array = [];
            for (let i=0; i < k; i++)
            {
                if (FeedPressure_array_2[i]>0){
                PressaoDif_array[i] = FeedPressure_array_2[i] - ConcentratedPressure_array_2[i];
                }
                else PressaoDif_array[i] = 0; 
            }
    
            let PressaoDif_value = PressaoDif_array[k-1];
           
            //cálculo do TDS ENTRADA CALCULADO (ppm)
 let TDS_entrada_calculado_array = [];

            for (let i=0; i < k; i++){
 if (FeedConductivity_array_2[i] === 0) 
 { 
     TDS_entrada_calculado_array[i] = 0;
 }
 if (FeedConductivity_array_2[i] > 0 && FeedConductivity_array_2[i] <= 7630) 
 {
    TDS_entrada_calculado_array[i] = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(FeedConductivity_array_2[i]), 2) / 188.88442227);
 }
 if (FeedConductivity_array_2[i] > 7630) {
    TDS_entrada_calculado_array[i] = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(FeedConductivity_array_2[i]), 2) / 112.483950289);
 }
}

let TDS_entrada_calculado_value = TDS_entrada_calculado_array[k-1];

 

//cálculo do TDS ENTRADA (sem fórmula e multiplicadopor 0.7 apenas) (ppm)
let TDS_entrada_array = [];
for (let i=0; i < k; i++){
    TDS_entrada_array[i] = FeedConductivity_array_2[i]*0.7;
}

let TDS_entrada_value = TDS_entrada_array[k-1];



 //cálculo do TDS PERMEADO CALCULADO (ppm)
 let TDS_permeado_calculado_array = [];
 
 for (let i=0; i < k; i++){
     if (PermConductivity_array_2[i] === 0) 
     { 
         TDS_permeado_calculado_array[i] = 0;
     }
     if (PermConductivity_array_2[i] > 0 && PermConductivity_array_2[i] <= 7630) 
     {
         TDS_permeado_calculado_array[i] = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(PermConductivity_array_2[i]), 2) / 188.88442227);
     }
     if (PermConductivity_array_2[i] > 7630) 
     {
         TDS_permeado_calculado_array[i] = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(PermConductivity_array_2[i]), 2) / 112.483950289);
     }
    }

        let TDS_permeado_calculado_value = TDS_permeado_calculado_array[k-1];
     
 //cálculo do TDS PERMEADO (ppm)
    let TDS_permeado_array = [];
    for (let i=0; i < k; i++){
        TDS_permeado_array[i] = PermConductivity_array_2[i]*0.7;
    }

    let TDS_permeado_value = TDS_permeado_array[k-1];

 
//cálculo TEMPERATURA CORREÇÃO
let Temp_correcao_array =[];

for (let i=0; i < k; i++){
 if (FeeTemperature_array_2[i] <= 0) 
 { 
     Temp_correcao_array[i] = 0;
 }
 if (FeeTemperature_array_2[i] > 0 ) 
 {
     Temp_correcao_array[i] = Math.exp(2640 * ((1 / 298.15) - 1 / (FeeTemperature_array_2[i] + 273.15)));
 }
}

let Temp_correcao_value = Temp_correcao_array[k-1];


 //cálculo CONCENTRAÇÃO MÉDIA CALCULADA ENTRADA (ppm)
 let conc_media_calculada_entrada_array = [];
 
 for (let i=0; i < k; i++){
     if (PermFlow_array_2[i] > 0) 
     { 
        if (FeedConductivity_array_2[i] > 0)
        {
         conc_media_calculada_entrada_array[i] = TDS_entrada_calculado_array[i] * Math.log(1 / (1 - PermFlow_array_2[i] / FeedFlow_array_2[i])) / (PermFlow_array_2[i] / FeedFlow_array_2[i]); 
        }
        if (FeedConductivity_array_2[i] <= 0)
        {
         conc_media_calculada_entrada_array[i] = TDS_entrada_array[i] * Math.log(1 / (1 - PermFlow_array_2[i] / FeedFlow_array_2[i])) / (PermFlow_array_2[i] / FeedFlow_array_2[i]);   
        }
     }
     if (PermFlow_array_2[i] <= 0)
     {
     conc_media_calculada_entrada_array[i] = 0;
     }
    }

        let conc_media_calculada_entrada_value = conc_media_calculada_entrada_array[k-1];

 
//cálculo PRESSÃO OSMÓTICA ENTRADA (kgf/cm²)
let pressao_osmotica_entrada_array = [];

for (i=0; i < k; i++){
if (FeedPressure_array_2[i] > 0 && FeeTemperature_array_2[i] > 0)
{
pressao_osmotica_entrada_array[i] = 0.0385 * conc_media_calculada_entrada_array[i] * (FeeTemperature_array_2[i] + 273.15) / ((1000 - (conc_media_calculada_entrada_array[i] / 1000)) * 14.25);
}
if (FeedPressure_array_2[i] <= 0)
{
    pressao_osmotica_entrada_array[i] = 0;
}
if ( FeeTemperature_array_2[i] <= 0 )
{
    pressao_osmotica_entrada_array[i] = 0;
}
}

let pressao_osmotica_entrada_value = pressao_osmotica_entrada_array[k-1];


//cálculo PRESSÃO OSMÓTICA PERMEADO (kgf/cm²)
let pressao_osmotica_permeado_array = [];

for (let i=0; i < k; i++){
    if (FeedPressure_array_2[i] <= 0)
    {
        pressao_osmotica_permeado_array[i] = 0;
    }
    if (FeedPressure_array_2[i] > 0 && PermConductivity_array_2[i] > 0 && FeeTemperature_array_2[i] > 0)
    {
        pressao_osmotica_permeado_array[i] = ((0.0385 * TDS_permeado_calculado_array[i] * (FeeTemperature_array_2[i] + 273.15)) / (1000 - (TDS_permeado_calculado_array[i] / 1000))) / 14.25;
    }
    if (FeedPressure_array_2[i] > 0 && PermConductivity_array_2[i] > 0 && FeeTemperature_array_2[i] <= 0)
    {
        pressao_osmotica_permeado_array[i] = 0;
    }
    if (FeedPressure_array_2[i] > 0 && PermConductivity_array_2[i] <= 0)
    {
        if (TDS_permeado_array[i] <=0 || FeeTemperature_array_2[i] <= 0)
        {
            pressao_osmotica_permeado_array[i] = 0;
        }
        if (TDS_permeado_array[i] > 0 && FeeTemperature_array_2[i] > 0)
        {
            pressao_osmotica_permeado_array[i] = ((0.0385 * TDS_permeado_array[i] * (FeeTemperature_array_2[i] + 273.15)) / (1000 - (TDS_permeado_array[i] / 1000))) / 14.25;
        }
    }
}

let pressao_osmotica_permeado_value = pressao_osmotica_permeado_array[k-1];

   
 // cálculo da PRESSÃO NET DRIVING
 let pressao_net_driving_array = [];

 for (let i=0; i < k; i++){
     if (FeedPressure_array_2[i] > 0)
     {
         pressao_net_driving_array[i] = FeedPressure_array_2[i] - (PressaoDif_array[i] / 2) - pressao_osmotica_entrada_array[i] - pressao_permeado + pressao_osmotica_permeado_array[i];
     }
     if (FeedPressure_array_2[i] <= 0)
     {
         pressao_net_driving_array[i] = 0;
     }
    }

    let pressao_net_driving_value = pressao_net_driving_array[k-1];

     
  
    //cálculo VAZÃO NORMALIZADA DO PERMEADO (m³/h)
    let vazao_normalizada_permeado_array = [];
    
    for (let i=0; i < k; i++){
        if (PermFlow_array_2[i] > 0)
        {
            vazao_normalizada_permeado_array[i] = (pressao_net_driving_zero * Temp_correcao_zero) / (pressao_net_driving_array[i] * Temp_correcao_array[i]) * PermFlow_array_2[i];
        }
        if (PermFlow_array_2[i] <= 0)
        {
            vazao_normalizada_permeado_array[i] = 0;
        }
    }

    let vazao_normalizada_permeado_value = vazao_normalizada_permeado_array[k-1];


         //cálculo da PASSAGEM SAL NORMALIZADA PERMEADO (%)
         let passagem_normalizada_array = [];
         
         for (let i=0; i < k; i++){
             if (PermFlow_array_2[i] <= 0)
            {
             passagem_normalizada_array[i] = 0;
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] > 0)
            {
             passagem_normalizada_array[i] = TDS_permeado_calculado_array[i] * PermFlow_array_2[i] * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao_array[i] * conc_media_calculada_entrada_array[i] * TDS_entrada_calculado_zero) * 100;
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] <= 0 && TDS_entrada_array[i] > 0)
            {
             passagem_normalizada_array[i] = TDS_permeado_array[i] * PermFlow_array_2[i] * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao_array[i] * conc_media_calculada_entrada_array[i] * TDS_entrada_calculado_zero) * 100;
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] <= 0 && TDS_entrada_array[i] <= 0)
            {
             passagem_normalizada_array[i] = 0;
            }
        }
         
        let passagem_normalizada_value = passagem_normalizada_array[k-1];

            //cálculo REJEIÇÃO SAL NORMALIZADA PERMEADO (%)
        let rejeicao_normalizada_array = [];
        for (let i=0; i < k; i++){
            if (PermFlow_array_2[i] <= 0)
            {
                rejeicao_normalizada_array[i] = 0;
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] > 0)
            {
                rejeicao_normalizada_array[i] = 100 - passagem_normalizada_array[i];
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] <= 0 && TDS_entrada_array[i] > 0)
            {
                rejeicao_normalizada_array[i] = 100 - passagem_normalizada_array[i];
            }
            if (PermFlow_array_2[i] > 0 && FeedConductivity_array_2[i] <= 0 && TDS_entrada_array[i] <= 0)
            {
                rejeicao_normalizada_array[i] = 0;
            }
        }
            let rejeicao_normalizada_value = rejeicao_normalizada_array[k-1];
           

            //----------------------------------------FIM DOS CÁLCULOS-----------------------------------------------------
            this.setState({
                chartData:{
                    labels: data_array_1,
                    datasets: [
                        {
                            label: "Rejeição de Sal Normalizada do Permeado (%)",
                            data: rejeicao_normalizada_array,
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
            <div className = "rejeicao_sal_normalizada_permeado">
                
                <Line
                    data = {this.state.chartData}
                    width = {1200}
                    height = {400}
                    options={{
                        title:{
                            display: true,
                            text: 'Rejeição de Sal Normalizada do Permeado (%)',
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

export default rejeicao_sal_normalizada_permeado;