import React, {useState, useEffect} from 'react';
import {Modal, Input, Row, Col} from 'antd';
import {EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined} from '@ant-design/icons'; // Импорт иконок
import './styles/Header.css';

const Header = () => {
    const [details, setDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getUserGeolocationDetails();
    }, []);

    const getUserGeolocationDetails = () => {
        fetch('https://geolocation-db.com/json/fd18cb60-5f5a-11ee-87d3-bd3f0d7c4f89')
            .then((response) => response.json())
            .then((data) => setDetails(data));
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        closeModal();
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCities = ['Вологда', 'Череповец', 'Ярославль'].filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="header">
            <Row gutter={16} align="middle">
                <Col flex="auto">
                    <p className="city-link" onClick={openModal}>
                        <EnvironmentOutlined style={{fontSize: '16px', paddingRight: '5px'}}/>
                        <span>{selectedCity || (details ? details.city : 'Не определен')}</span>
                    </p>
                </Col>
                <Col>
                    <p className="phone-number">
                        <PhoneOutlined style={{fontSize: '16px', paddingRight: '5px'}}/>
                        Телефон горячей линии: +89218493821
                    </p>
                </Col>
                <Col>
                    <p className="work-time">
                        <ClockCircleOutlined style={{fontSize: '16px', paddingRight: '5px'}}/>
                        Сегодня с 9:00 до 00:00
                    </p>
                </Col>
            </Row>

            <Modal
                title="Выберите город"
                visible={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                <Input
                    placeholder="Поиск города"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <div style={{marginTop: '10px'}}>
                    {filteredCities.map((city) => (
                        <p
                            key={city}
                            className="city-link"
                            onClick={() => handleCitySelect(city)}
                        >
                            {city}
                        </p>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Header;
