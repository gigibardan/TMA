// partner-generator.js
// Script pentru generarea automată de pagini partner

const fs = require('fs');
const path = require('path');

// Configurații pentru fiecare companie
const partnerConfigs = {
    orange: {
        THEME_CLASS: 'theme-orange',
        COMPANY_NAME: 'Orange',
        COMPANY_NAME_UPPER: 'ORANGE',
        COMPANY_LOGO_URL: 'https://www.orange.ro/_next/static/media/orange-logo.bca59c66.svg',
        COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2000',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1000',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2500',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1250',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3000',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2000',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerOrange1',
        DISCOUNT_CODE_2: 'PartenerOrange2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },
    
    vodafone: {
        THEME_CLASS: 'theme-vodafone',
        COMPANY_NAME: 'Vodafone',
        COMPANY_NAME_UPPER: 'VODAFONE',
        COMPANY_LOGO_URL: 'https://www.vodafone.ro/assets/logo.svg',
        COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2000',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1000',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2500',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1250',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3000',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2000',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerVodafone1',
        DISCOUNT_CODE_2: 'PartenerVodafone2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },
    
       
    telekom: {
        THEME_CLASS: 'theme-telekom',
        COMPANY_NAME: 'Telekom',
        COMPANY_NAME_UPPER: 'TELEKOM',
        COMPANY_LOGO_URL: 'https://i.ibb.co/yBMWMJsf/dl-telekom-logo-01-4.jpg',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerTelekom1',
        DISCOUNT_CODE_2: 'PartenerTelekom2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },


     evalue: {
        THEME_CLASS: 'theme-evalue-international',
        COMPANY_NAME: 'Evalue',
        COMPANY_NAME_UPPER: 'E-VALUE INTERNATIONAL',
        COMPANY_LOGO_URL: 'https://www.cosmote-evalue.gr/wp-content/uploads/2024/02/logo-1.png',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerEValue1',
        DISCOUNT_CODE_2: 'PartenerEValue2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },

    ASEESolutions: {
        THEME_CLASS: 'theme-ASEE-Solutions',
        COMPANY_NAME: 'ASEE Solutions',
        COMPANY_NAME_UPPER: 'ASEE Solutions',
        COMPANY_LOGO_URL: 'https://asee.io/wp-content/uploads/2024/12/logo-bb-r.png',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerASEE1',
        DISCOUNT_CODE_2: 'PartenerASEE2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },

    bithat: {
        THEME_CLASS: 'theme-bithat-solutions',
        COMPANY_NAME: 'BitHat Solutions',
        COMPANY_NAME_UPPER: 'BITHAT SOLUTIONS',
        COMPANY_LOGO_URL: 'https://media.licdn.com/dms/image/v2/C4D0BAQHmnBCO19JPZQ/company-logo_200_200/company-logo_200_200/0/1676629529748/bithat_solutions_logo?e=1753920000&v=beta&t=Ky8E_Lmy3c1yTxeYmGLmBV3mOVp41WYrRmby09-8pvQ',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerBithat1',
        DISCOUNT_CODE_2: 'PartenerBithat2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },


    payten: {
        THEME_CLASS: 'theme-payten',
        COMPANY_NAME: 'Payten',
        COMPANY_NAME_UPPER: 'PAYTEN',
        COMPANY_LOGO_URL: 'https://www.payten.com/static/images/logo.png',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerPayten1',
        DISCOUNT_CODE_2: 'PartenerPayten2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },

     ContentSpeed: {
        THEME_CLASS: 'theme-ContentSpeed',
        COMPANY_NAME: 'ContentSpeed',
        COMPANY_NAME_UPPER: 'ContentSpeed',
        COMPANY_LOGO_URL: 'https://cdn.contentspeed.ro/slir/h60/csnew.speedsites.ro/cs-content//cs-skins/cs_lider/custom/logo-image_1678975364.png',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerContentSpeed1',
        DISCOUNT_CODE_2: 'PartenerContentSpeed2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },


     unicredit: {
        THEME_CLASS: 'theme-unicredit',
        COMPANY_NAME: 'unicredit',
        COMPANY_NAME_UPPER: 'unicredit',
        COMPANY_LOGO_URL: 'https://www.unicredit.ro/etc/designs/cee2020-pws-ro/img/logos/logo_ro.svg',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerUnicredit1',
        DISCOUNT_CODE_2: 'PartenerUnicredit2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },


     ericsson: {
        THEME_CLASS: 'theme-ericsson',
        COMPANY_NAME: 'ericsson',
        COMPANY_NAME_UPPER: 'ericsson',
        COMPANY_LOGO_URL: 'https://cdn.worldvectorlogo.com/logos/ericsson-1.svg',
         COURSE_DISCOUNT: '42',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '420',
        PROGRAMMING_SAVINGS: '220',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '420',
        ROBOTICS_SAVINGS: '220',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '750',
        COMBINED_SAVINGS: '530',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'PartenerEricsson1',
        DISCOUNT_CODE_2: 'PartenerEricsson2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    },

    
     vasilealecsandri: {
        THEME_CLASS: 'theme-scoala-alecsandri',
        COMPANY_NAME: 'vasile-alecsandri',
        COMPANY_NAME_UPPER: 'Școala Gimnazială "Vasile Alecsandri"',
        COMPANY_LOGO_URL: 'https://scoala118.ro/wp/wp-content/uploads/2024/09/cropped-cropped-cropped-logo-1.png',
        COURSE_DISCOUNT: '30',
        AFTERSCHOOL_DISCOUNT: '50',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: '460',
        PROGRAMMING_SAVINGS: '180',
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: '460',
        ROBOTICS_SAVINGS: '180',
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: '900',
        COMBINED_SAVINGS: '380',
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2200',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: '1100',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2750',
        AFTER_SCHOOL_DISCOUNTED_PRICE: '1400',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3300',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: '2200',
        COMPLETE_PACKAGE_DISCOUNT: '33',
        DISCOUNT_CODE_1: 'VasileAlecsandri1',
        DISCOUNT_CODE_2: 'VasileAlecsandri2',
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: 'buy_btn_1QzKIoL5EMW6XT767pw9mP97',
        STRIPE_ROBOTICS_BUTTON_ID: 'buy_btn_1QzKLCL5EMW6XT76ljxQ2JUg',
        STRIPE_COMBINED_BUTTON_ID: 'buy_btn_1RTKTbL5EMW6XT76nvQ5VJkt',
        STRIPE_AFTERSCHOOL_BUTTON_ID: 'buy_btn_1RTKZtL5EMW6XT76CEnZZ3wd',
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    }
};

/**
 * Citește template-ul HTML și înlocuiește placeholder-urile
 * @param {string} templatePath - calea către template-ul HTML
 * @param {object} config - configurația pentru companie
 * @returns {string} - HTML-ul generat
 */
function generateHTML(templatePath, config) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Înlocuiește toate placeholder-urile cu valorile din config
    Object.keys(config).forEach(key => {
        const placeholder = `{{${key}}}`;
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        htmlContent = htmlContent.replace(regex, config[key]);
    });
    
    return htmlContent;
}

/**
 * Generează pagină pentru o companie specifică
 * @param {string} companyKey - cheia companiei din partnerConfigs
 * @param {string} templatePath - calea către template
 * @param {string} outputDir - directorul de output
 */
function generatePartnerPage(companyKey, templatePath, outputDir) {
    const config = partnerConfigs[companyKey];
    
    if (!config) {
        console.error(`Configurația pentru compania "${companyKey}" nu există!`);
        return;
    }
    
    console.log(`Generez pagina pentru ${config.COMPANY_NAME}...`);
    
    // Generează HTML-ul
    const htmlContent = generateHTML(templatePath, config);
    
    // Creează directorul de output dacă nu există
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Salvează fișierul
    const outputPath = path.join(outputDir, `oferta-${companyKey}.html`);
    fs.writeFileSync(outputPath, htmlContent, 'utf8');
    
    console.log(`✅ Pagina pentru ${config.COMPANY_NAME} a fost generată: ${outputPath}`);
}

/**
 * Generează toate paginile pentru toate companiile
 * @param {string} templatePath - calea către template
 * @param {string} outputDir - directorul de output
 */
function generateAllPartnerPages(templatePath, outputDir) {
    console.log('🚀 Încep generarea tuturor paginilor partner...\n');
    
    Object.keys(partnerConfigs).forEach(companyKey => {
        generatePartnerPage(companyKey, templatePath, outputDir);
    });
    
    console.log('\n✨ Toate paginile au fost generate cu succes!');
    console.log('\n📝 Pașii următori:');
    console.log('1. Verifică paginile generate în directorul:', outputDir);
    console.log('2. Actualizează ID-urile Stripe pentru fiecare companie');
    console.log('3. Testează funcționalitatea pe fiecare pagină');
    console.log('4. Ajustează culorile dacă este necesar în CSS');
}

/**
 * Creează un fișier de configurare pentru o nouă companie
 * @param {string} companyKey - cheia companiei (ex: 'enel', 'eon')
 * @param {object} customConfig - configurația personalizată
 */
function addNewCompany(companyKey, customConfig) {
    if (partnerConfigs[companyKey]) {
        console.warn(`⚠️  Compania "${companyKey}" există deja!`);
        return;
    }
    
    // Template pentru companie nouă
    const defaultConfig = {
        THEME_CLASS: `theme-${companyKey}`,
        COMPANY_NAME: customConfig.companyName || companyKey.charAt(0).toUpperCase() + companyKey.slice(1),
        COMPANY_NAME_UPPER: (customConfig.companyName || companyKey).toUpperCase(),
        COMPANY_LOGO_URL: customConfig.logoUrl || 'https://example.com/logo.svg',
        COURSE_DISCOUNT: customConfig.courseDiscount || '35',
        AFTERSCHOOL_DISCOUNT: customConfig.afterschoolDiscount || '40',
        PROGRAMMING_ORIGINAL_PRICE: '640',
        PROGRAMMING_DISCOUNTED_PRICE: customConfig.programmingPrice || '480',
        PROGRAMMING_SAVINGS: (640 - (customConfig.programmingPrice || 480)).toString(),
        ROBOTICS_ORIGINAL_PRICE: '640',
        ROBOTICS_DISCOUNTED_PRICE: customConfig.roboticsPrice || '480',
        ROBOTICS_SAVINGS: (640 - (customConfig.roboticsPrice || 480)).toString(),
        COMBINED_ORIGINAL_PRICE: '1280',
        COMBINED_DISCOUNTED_PRICE: customConfig.combinedPrice || '850',
        COMBINED_SAVINGS: (1280 - (customConfig.combinedPrice || 850)).toString(),
        BEFORE_SCHOOL_ORIGINAL_PRICE: '2000',
        BEFORE_SCHOOL_DISCOUNTED_PRICE: customConfig.beforeSchoolPrice || '1200',
        AFTER_SCHOOL_ORIGINAL_PRICE: '2500',
        AFTER_SCHOOL_DISCOUNTED_PRICE: customConfig.afterSchoolPrice || '1500',
        COMPLETE_PACKAGE_ORIGINAL_PRICE: '3000',
        COMPLETE_PACKAGE_DISCOUNTED_PRICE: customConfig.completePackagePrice || '2200',
        COMPLETE_PACKAGE_DISCOUNT: Math.round((1 - (customConfig.completePackagePrice || 2200) / 3000) * 100).toString(),
        DISCOUNT_CODE_1: `Partener${customConfig.companyName || companyKey.charAt(0).toUpperCase() + companyKey.slice(1)}1`,
        DISCOUNT_CODE_2: `Partener${customConfig.companyName || companyKey.charAt(0).toUpperCase() + companyKey.slice(1)}2`,
        REGISTRATION_PERIOD: '01.06.2025 – 30.06.2025',
        COURSE_PERIOD: '01.09.2025 – 19.06.2026',
        STRIPE_PROGRAMMING_BUTTON_ID: `buy_btn_${companyKey}_prog_placeholder`,
        STRIPE_ROBOTICS_BUTTON_ID: `buy_btn_${companyKey}_robot_placeholder`,
        STRIPE_COMBINED_BUTTON_ID: `buy_btn_${companyKey}_combined_placeholder`,
        STRIPE_AFTERSCHOOL_BUTTON_ID: `buy_btn_${companyKey}_afterschool_placeholder`,
        STRIPE_PUBLISHABLE_KEY: 'pk_live_51QytJOL5EMW6XT76sXU2ClpATgCSG51QDlqdWDvOEHBP2FJPoP3QfbnI468yFZiFUOl62CsTezPHLo8nDmUhRhDp00hOSPDNXi'
    };
    
    partnerConfigs[companyKey] = defaultConfig;
    console.log(`✅ Compania "${companyKey}" a fost adăugată în configurații!`);
}

/**
 * Generează CSS-ul cu noua clasă de temă pentru o companie
 * @param {string} companyKey - cheia companiei
 * @param {object} colors - obiect cu culorile companiei
 * @returns {string} - CSS-ul pentru tema companiei
 */
function generateCompanyThemeCSS(companyKey, colors) {
    const {
        primary = '#ff6b00',
        secondary = '#ff8533',
        tertiary = '#ffaa66',
        accent = '#ff5500'
    } = colors;
    
    // Convertește hex în rgba pentru transparențe
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    return `
/* ${companyKey.charAt(0).toUpperCase() + companyKey.slice(1)} Theme */
.theme-${companyKey} {
    --brand-primary: ${primary};
    --brand-secondary: ${secondary};
    --brand-tertiary: ${tertiary};
    --brand-accent: ${accent};
    --shadow-brand: 0 8px 25px ${hexToRgba(primary, 0.3)};
    --shadow-brand-hover: 0 12px 30px ${hexToRgba(primary, 0.4)};
    --brand-overlay-light: ${hexToRgba(primary, 0.1)};
    --brand-overlay-medium: ${hexToRgba(primary, 0.2)};
    --brand-overlay-dark: ${hexToRgba(primary, 0.3)};
}
`;
}

// Funcții de utilizare
if (require.main === module) {
    // Exemplu de utilizare
    const templatePath = './template-partner.html';
    const outputDir = './generated-partners';
    
    // Pentru a genera toate paginile:
    // generateAllPartnerPages(templatePath, outputDir);
    
    // Pentru a genera o singură pagină:
    // generatePartnerPage('vodafone', templatePath, outputDir);
    
    // Pentru a adăuga o companie nouă:
    /*
    addNewCompany('enel', {
        companyName: 'Enel',
        logoUrl: 'https://www.enel.ro/content/dam/enel-ro/logo.svg',
        courseDiscount: '30',
        afterschoolDiscount: '35',
        programmingPrice: 500,
        roboticsPrice: 500,
        combinedPrice: 900,
        beforeSchoolPrice: 1300,
        afterSchoolPrice: 1600,
        completePackagePrice: 2300
    });
    */
    
    // Pentru a genera CSS pentru o nouă companie:
    /*
    const enelCSS = generateCompanyThemeCSS('enel', {
        primary: '#00b9d8',
        secondary: '#33c7e5',
        tertiary: '#66d5f2',
        accent: '#0099b8'
    });
    console.log(enelCSS);
    */
    
    console.log('🎯 Script de generare partner încărcat!');
    console.log('📋 Funcții disponibile:');
    console.log('  - generateAllPartnerPages(templatePath, outputDir)');
    console.log('  - generatePartnerPage(companyKey, templatePath, outputDir)');
    console.log('  - addNewCompany(companyKey, customConfig)');
    console.log('  - generateCompanyThemeCSS(companyKey, colors)');
}

module.exports = {
    partnerConfigs,
    generateHTML,
    generatePartnerPage,
    generateAllPartnerPages,
    addNewCompany,
    generateCompanyThemeCSS
};