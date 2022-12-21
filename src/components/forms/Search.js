import React, {useState} from 'react';
import {DatePicker, Select} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select;


const Search = () => {
    //route
    const history = useHistory();
    //state
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [bed, setBed] = useState('');

    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
        console.log(e.target.value)
    }

    return (
        <div className='d-flex pb-4'>
            <div className='w-100'>
                <input 
                    type='text' 
                    placeholder='Location' 
                    value={location}
                    onChange={handleChange}
                    style={{ height: "50px", width: "100%" }}
                />
            </div>
            <RangePicker 
                onChange={(value, dateString) => setDate(dateString)} 
                disabledDate={
                    (current) => current && current.valueOf() < moment().subtract(1, "days")
                } 
                className="w-100" 
            />
            <Select 
                onChange={(value) => setBed(value)} 
                className="w-100" 
                size='large'
                placeholder='Number of beds'
            >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>

            <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn-square" />
            
        </div>

    )
};

export default Search;