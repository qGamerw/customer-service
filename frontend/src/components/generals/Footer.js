import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: '#696666',
            width: '100%',
            padding: '15px 0',
            textAlign: 'center',
            color: 'white'
        }}>
            <p>
                &copy; {currentYear} Грузинский ресторан
            </p>
        </footer>
    );
}

export default Footer;
