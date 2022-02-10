import axios from "axios";
import { useEffect, useState } from "react";
import component from "./SliderWeather.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function SliderWeather({countSlider, weather}) {
    const element = {
        arrow_left: <FontAwesomeIcon icon={faArrowLeft} />,
        arrow_right: <FontAwesomeIcon icon={faArrowRight} />
}

    const [defaulCity, setDefaulCity] = useState([]); //объекты с городами по дефолту
    const [click, setClick] = useState(0);
    const [activeslide, setActiveslide] = useState(1); //активный слайд
    const widthSlide = 400; //ширина слайда
    let sities = ["Almaty", "Astana", "Los Angeles", "Abu Dhabi", "Esik"]; //это дефолтные города для слайдера
    let slide = [];

    useEffect(() => {
        for (let i = 0; i < sities.length; i++) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${sities[i]}&appid=5339736bab9a269704367fe233a24089`)
            .then(res => {
                const weather = res.data;
                setDefaulCity(prev => [...prev, weather]);
            })
        }
    }, []);

    for (let i = 1; i <= countSlider; i++) {
        slide[i] = {
            id: i,
            transform: click,
            width: widthSlide,
            content: [
                {
                    id: i,
                    name: `${weather && weather.weather.name}`
                },
            ],
        };
    };

    const scrollSliderLeft = () => {
        setClick(offset => {
            const newClick = offset + widthSlide + 50;
            
            if (newClick === widthSlide + 50) {
                setActiveslide(slide.length -1);
                return (-((widthSlide + 50) * (slide.length -1)) +450);
            } else {
                setActiveslide(activeslide - 1);
                return newClick;
            }
        });
    };

    const scrollSliderRight = () => {
        setClick(offset => {
            const newClick = offset - widthSlide - 50;
            if (newClick <= -((widthSlide + 50) * (slide.length -1))) {
                setActiveslide(1);
                return 0;
            } else {
                setActiveslide(activeslide + 1);
                return newClick;
            }
        });
    };

    const cyrcleNavigation = (id) => {
        setClick(() => {
            if (id !== activeslide) {
                setActiveslide(id);
            }

            if (id === 1) {
                return 0
            } else {
                return (-((widthSlide + 50) * id) + 450);
            }
        });
    };

    return (
        <div className={component.slider}>
            <div className={component["slider-wrap"]}>
                <div className={component.slider__arrow_left} onClick={() => scrollSliderLeft()}>
                    {element.arrow_left}
                </div>
                <div className={component.slider__show_window}>
                    {slide.map(({id, transform, width, content}) =>
                        <div key={id}>
                            <div 
                                className={`
                                    ${component.slider__slide}
                                    ${activeslide === id ? component["slider--active_slider"] : ""}
                                `}
                                style={{
                                    transform: `translateX(${transform}px)`,
                                    width: `${activeslide === id ? "500px" : `${width}px`}`
                                }}
                            >
                                {defaulCity.length >= id && 
                                    <div>
                                        <h2>{defaulCity[id -1].name}</h2>
                                        <div className={component["slider__data_weather--wrap"]}>
                                            <img src={`http://openweathermap.org/img/wn/${defaulCity[id -1].weather[0].icon}.png`} alt="" />
                                            {Math.round(defaulCity[id -1].main.temp - 273)}
                                        </div>
                                            <p className={component.slider__description}>{defaulCity[id -1].weather[0].description}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
                <div className={component.slider__arrow_right} onClick={() => scrollSliderRight()}>
                    {element.arrow_right}
                </div>
            </div>
            <div className={component.slider__cyrcles_navigation}>
                <ul className={`${component["slider-cyrcles-wrap"]} ${component["slider-wrap"]}`}>
                    {slide.map(({id}) => 
                        <li 
                            key={id}
                            className={`
                                ${component.slider__cyrcle_element} 
                                ${activeslide === id ? component["slider__cyrcle_element--active"] : ""}
                            `}
                            onClick={() => cyrcleNavigation(id)}
                        ></li>
                    )}
                </ul>
            </div>
        </div>
    );
};