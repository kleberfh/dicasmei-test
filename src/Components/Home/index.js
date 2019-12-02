import React, { useState } from 'react';
import { Input, Tooltip, Toast, ToastHeader, ToastBody } from 'reactstrap';
import InputMask from 'react-input-mask';
import LoadingScreen from "react-loading-screen";
import { Redirect } from 'react-router-dom';

import API from '../API'

import Header from "../Header";

import './styles.css';

const Home = (props) => {
    const [tooltipOpenAgreement, seTooltipOpenAgreement] = useState(false);
    const [tooltipOpen, seTooltipOpen] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bills, setBills] = useState(null);
    const [cnpj, setCnpj] = useState(undefined);

    function handleCnpjChange (value) {
        seTooltipOpen(false);
        setCnpj(value)
    }

    function handleAgreementChange (value) {
        seTooltipOpenAgreement(false);
        setAgreement(value)
    }

    async function submit() {
        const valid = !!cnpj;
        if (!agreement) {
            seTooltipOpenAgreement(true);
            return
        } else if (!valid) {
            seTooltipOpen(true);
            return
        }
        const pureCnpj = cnpj.replace(/\D/g,'');
        setLoading(true);
        const billsResponse = await API.getBills(pureCnpj);
        console.log(billsResponse);
        console.log(!billsResponse || !billsResponse.boletos || (billsResponse.boletos.status && billsResponse.boletos.mensagem));
        if (!billsResponse || !billsResponse.boletos || (billsResponse.boletos.status && billsResponse.boletos.mensagem)) {
            setLoading(false);
            setShowToast(true);
            return
        }
        setBills(billsResponse);
        setRedirect(true);
    }

    return (
        <div id={'main'}>
            <Header mainText={'Veja seus boletos DAS na hora com a  DicasMEI!'} subText={'Preencha as informações abaixo e veja todo o histórico de boletos.'}/>
            <LoadingScreen
                loading={loading}
                bgColor='#f1f1f1'
                spinnerColor='#1eb99a'
                textColor='#676767'
                text='Carregando Boletos...'
            >
                <div className={'body-content'}>
                <Tooltip placement="top" isOpen={tooltipOpen} target="cnpj">
                    CNPJ inválido
                </Tooltip>
                <Toast isOpen={showToast} className={'bg-danger'}>
                    <ToastHeader toggle={() => setShowToast(false)}>Ops!</ToastHeader>
                    <ToastBody>
                        Desculpe, correu um erro ao carregar os boletos. Por favor, verifique o CNPJ ou tente novamente mais tarde.
                    </ToastBody>
                </Toast>
                <InputMask mask={'99.999.999/9999-99'} maskChar={null} value={cnpj} onChange={(e) => handleCnpjChange(e.target.value)}>
                    {(inputProps) => <Input {...inputProps} className={'cnpj-input'} type={'text'} placeholder={'CNPJ'} id={'cnpj'}
                        style={{borderColor: tooltipOpen ? 'red' : ''}}
                    />}
                </InputMask>
                <div className={'agreement'}>
                    <Tooltip placement="bottom" isOpen={tooltipOpenAgreement} target="agreement">
                        Você precisa aceitar os termos para continuar
                    </Tooltip>
                    <Input id={'agreement'} style={{height: 20}} type={'checkbox'} value={agreement} onChange={(e) => handleAgreementChange(e.target.value)}/>
                    <span className={'mini-text'}>{'Li e aceito os'} <a style={{color: "gray", textDecoration: 'underline'}} href={'/termos'}>{'termos de uso'}</a></span>
                </div>
                </div>
                <div className={'button-align'}>
                    <button className={'button'} onClick={submit}> Iniciar Agora </button>
                </div>
            </LoadingScreen>
            {redirect && (
                <Redirect to={{
                    pathname: '/boletos',
                    state: {bills}
                }} />
            )}
        </div>
    );
};

export default Home