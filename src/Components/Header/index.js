import React  from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import './styles.css';

import Logo from '../../Assets/img/logo.png';
import Guard from '../../Assets/img/Grupo 6677.png';

const Header = (props) => {

    return (
        <div id={'main'}>
            <Row className={'top'}>
                <div className={'top-row'}>
                    <Link to={'/'}>
                        <img className={'logo'} src={Logo} />
                    </Link>
                    <div className={'text-alignment'}>
                        <span className={'top-text'}>
                            Ambiente seguro
                        </span>
                        <span className={'top-text'}>
                            Seus dados protegidos
                        </span>
                    </div>
                    <img className={'guard'} src={Guard} />
                </div>
            </Row>
            <div className={'body-content'}>
                <span className={'main-text'}>{props.mainText}</span>
                <span className={'sub-text'}>{props.subText}</span>
            </div>
        </div>
    );
};

export default Header