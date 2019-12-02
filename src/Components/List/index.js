import React, { useState }  from 'react';
import Header from "../Header";

import './styles.css';

import {Redirect} from "react-router-dom";

const List = (props) => {
    const [redirect, setRedirect] = useState(false);

    const dataBills = props.location.state.bills;

    if (!dataBills) setRedirect(true);

    const bills = dataBills.boletos;

    const customBadgeStyle = {
        color: 'white',
        width: 60,
        textAlign: 'center',
        fontSize: 10,
        backgroundColor:'#e1173f',
        borderRadius: 20
    };

    const getYear = (value) => {
        return
    };

    const getMonth = (value) => {
        const month = value.split('/')[0];
        return month.substring(3, 0);
    };

    const getDay = (value) => {
        const day = value.split('/')[0];
        return day;
    };

    const getValue = (value) => {
        return value !== '-' ? value : 'Pago';
    };

    const getStatus = (value) => {
        return value === 'Liquidado';
    };

    return (
        <div>
            <Header mainText={'Meus boletos DAS'} subText={'Veja a relação completa de seus boletos DAS'} />
            <div className={'display-bills'}>
                <div className={'bills-list'}>
                    {bills.map((bill) => (
                        <div className={'bill-item'} style={{color: getStatus(bill.situacao) ? '#1eb99a' : '#e1173f'}}>
                            <span className={'month'}>{getMonth(bill.periodoApuracao)}</span>
                            <span className={'day'}>{getDay(bill.dataVencimento)}</span>
                            <span className={'value'}>{getValue(bill.total)}</span>
                            <span className={'status'}
                                style={getStatus(bill.situacao) ? {} : customBadgeStyle}
                            >
                                {getStatus(bill.situacao) ? '' : 'Em aberto'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {redirect && (
                <Redirect to={'/'} />
            )}
        </div>
    );
}

export default List