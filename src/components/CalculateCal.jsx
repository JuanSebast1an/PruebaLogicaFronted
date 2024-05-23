import React, { useState, useEffect } from 'react';

export const CalculateCal = () => {
  
    const [age, setAge] = useState(16);
    const [weightMetric, setWeightMetric] = useState(40.5);
    const [weightImperial, setWeightImperial] = useState(89.3);
    const [heightMetric, setHeightMetric] = useState(140);
    const [heightImperial, setHeightImperial] = useState(55.1);
    const [unit, setUnit] = useState('metric');
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        calculateCalories();
      }, [age, weightMetric, weightImperial, heightMetric, heightImperial, unit]);

    const UnitChange = (e) => {
        setUnit(e.target.value);
      };

    const WeightChange = (e) => {
        let weightValue = parseFloat(e.target.value);
        if(unit === 'metric'){
            if(weightValue < 40.5 || weightValue > 300)return;
            setWeightMetric(weightValue);
        };
        if(unit === 'imperial'){
            if(weightValue < 89.3 || weightValue > 661.4) return;
            setWeightImperial(weightValue)
        };
      };

      const HeightChange = (e) => {
        let heightValue = parseFloat(e.target.value);

        if(unit === 'metric'){
            if(heightValue < 140 || heightValue > 225)return;
            setHeightMetric(heightValue);
        };
        if(unit === 'imperial'){
            if(heightValue < 55.1 || heightValue > 88.6) return;
            setHeightImperial(heightValue);
        };
      };

      const AgeChange = (e) => {
        let ageValue = parseInt(e.target.value);
        if (ageValue < 16 || ageValue > 105) return;
        setAge(ageValue);
      };

      const calculateCalories = () => {
        let weightInPounds = unit === 'metric' ? weightMetric * 2.20462 : weightImperial;
        let heightInInches = unit === 'metric' ? heightMetric * 0.393701 : heightImperial;
    
        let factor = weightInPounds < 165 ? 1.6 : weightInPounds <= 200 ? 1.4 : weightInPounds <= 220 ? 1.2 : 1;
        let calories = (10 * weightInPounds + 6.25 * heightInInches - 10 * age + 5) * factor;
    
        setCalories(calories);
      };
    

    return(
        <>
        <h1>Calculadora de Calorías</h1>
        <label>
            Unidad:
            <select value={unit} onChange={UnitChange}>
                <option value="metric" >Métrico (Kg, cm)</option>
                <option value="imperial">Imperial (lb, in)</option> 
            </select>
        </label>
        <br/>
        <label>
            Edad:
            <input type='number' value={age} onChange={AgeChange} min="16" max="105" />
        </label>
        <br/>
        <label>
            Peso ({unit === 'metric' ? 'kg' : 'lb'}):
            <input type='number' value={unit === 'metric' ? weightMetric : weightImperial}  onChange={WeightChange} step="0.1"/>
        </label>
        <br/>
        <label>
            Altura ({unit === 'metric' ? 'cm' : 'in'}):
            <input type='number' value={unit === 'metric' ? heightMetric : heightImperial} onChange={HeightChange} step="0.1"/>
        </label>
        <br/>
        <h2>Calorias a consumir: {calories.toFixed(2)} kcal</h2>
        </>
    )

}
