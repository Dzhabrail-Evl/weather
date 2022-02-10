import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import SliderWeather from "../SliderWeather/SliderWeather";
import component from "./Weather.module.scss";

export default function Weather() {

    const [weather, setWeather] = useState();
    const [citySearch, setCitySearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [image, setImage] = useState(false);
    const [countSlider, setCountSlider] = useState(5);
    const {
        register,
        handleSubmit,
        formState: { errors, submitCount },
    } = useForm({mode: "onBlur"});

    function cityName() {
        return (
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=5339736bab9a269704367fe233a24089`)
            .then(res => {
                const weather = res.data;
                setWeather({ weather });
                setErrorMessage("")
            })
            .catch(error => {
                setErrorMessage(`Ошибка: ${error}`);
            })
        );
    };

    useEffect(() => {
        function aA() {
            return (
                axios.get(`https://api.unsplash.com/search/photos?query=london&client_id=hI_R2GcqVKBR2z9Jlxw2MOzLLB7L4-Q1qfQQgUR4tuo`)
                .then(res => {
                    const image = res.data;
                    setImage({ image });
                })
                .catch(error => {
                    setErrorMessage(`Ошибка: ${error}`);
                })
            );
        };
        aA();
    }, [])
    if (image) {
        console.log(image.image.results[0].urls.raw)
    }

    return (
        <div className={component.weather}>
            {/* <p>
                Вводите название города на латинице, с доступным списком городов можно ознакомиться -
                <Link className="router-link" target="_blank" to="/cities">
                    здесь
                </Link> 
            </p> */}
            <div className={component.weather__search}>
                <Input
                    type="text"
                    placeholder="Введите название города"
                    registerName="city"
                    register={register}
                    errors={errors}
                    onChange={e => setCitySearch(e.target.value)}
                />
                <Button className="button--primary" method={() => cityName()} text="search" width="100px"/>
            </div>
            <p className={component.weather__error_message}>{errorMessage}</p>
            {weather !== undefined && 
                <div className={component.weather__wrap} style={{background: ``}}>
                    <h1>{weather.weather.name}</h1>
                    <h2>{Math.round(weather.weather.main.temp - 273)}</h2>
                    <h2>{weather.weather.weather[0].description}</h2>
                </div>
            }
            <SliderWeather countSlider={countSlider} weather={weather}/>
        </div>
    );
};
