// @ts-nocheck

import { TFunction } from "i18next";

import { useRef, useState } from "react";
import { sendMessage } from "../../lib/api";

const contactEmails = 'quynhnt88@gmail.com,floris.panico@yahoo.co.uk,Nguyenthuy1095@gmail.com';

const ContactForm = ({ t }: { t: TFunction }) => {
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [phoneNumberValue, setPhoneNumberValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [messageValue, setMessageValue] = useState('');
  
    const handleFirstNameChange = (e: any) => {
      setFirstNameValue(e.target.value)
    };
  
    const handleLastNameChange = (e: any) => {
      setLastNameValue(e.target.value)
    };
  
    const handlePhoneNumberChange = (e: any) => {
      setPhoneNumberValue(e.target.value)
    };
  
    const handleEmailChange = (e: any) => {
      setEmailValue(e.target.value)
    };
    
    const handleMessageChange = (e: any) => {
      setMessageValue(e.target.value)
    };
  
  
    const [popUpVisible, setPopUpVisible] = useState(false);
    const showPopUp = () => {
  
        if (emailValid) {
          setPopUpVisible(prevState => !prevState)
          setTimeout(() => {
              setPopUpVisible(prevState => !prevState)
          }, 2000)
    
          setTimeout(() => {
            setFirstNameValue('');
            setLastNameValue('');
            setPhoneNumberValue('');
            setEmailValue('');
            setMessageValue('');
          }, 200)
        }

        return emailValid;
    }

    const emailInputRef = useRef(null);

    const [emailValid, setEmailValid] = useState(true);
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = (e: React.FormEvent<HTMLInputElement>) => {
      const email = e?.currentTarget.value
      if (email && validateEmail(email)) {
        setEmailValid(true);
      } else if (email) {
        setEmailValid(false);
      }

      return false
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default form submission

      const message = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phoneNumber: phoneNumberValue,
        message: messageValue
      };


      await sendMessage(message);
      showPopUp()

    };

    return (
        <div className="mx-auto px-4 md:px-8 xl:px-[3.75rem] py-7">

          {/* iframe to prevent reloading */}
          <iframe name="frame" className="hidden"></iframe>

          {/* send message to email using formsubmit.co */}
          <form className="mx-auto flex flex-col items-center gap-6" onSubmit={(e) => handleFormSubmit(e)}>
                <h1 className="text-neutral-900 font-semibold text-2xl md:text-[2rem] md:leading-10 text-center">{t('sendAMessage')}</h1>
                <div className="flex gap-7 -md:flex-col ">
                  <div className="flex gap-2 flex-col">
                      <label className="text-neutral-800 font-medium text-base">{t('firstName')}</label>
                      <input type="text" name="First Name" placeholder={t('firstNamePlaceholder')} required value={firstNameValue} onChange={(e) => handleFirstNameChange(e)}
                      className="w-input-field px-6 py-2 border-2 border-neutral-500 placeholder:text-xs text-base"/>
                  </div>
                  <div className="flex gap-2 flex-col">
                      <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('lastName')}</label>
                      <input type="text" name="Last Name" placeholder={t('lastNamePlaceholder')} required value={lastNameValue} onChange={(e) => handleLastNameChange(e)}
                      className="w-input-field px-6 py-2 border-2 border-neutral-500 placeholder:text-xs text-base"/>
                  </div>
                </div>
                <div className="flex gap-7 -md:flex-col">
                <div className="flex gap-2 flex-col">
                    <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('phoneNumber')}</label>
                    <input type="number" name="Phone Number" minLength={5} placeholder={t('phoneNumberPlaceholder')} required value={phoneNumberValue} 
                    onChange={(e) => handlePhoneNumberChange(e)}
                    onKeyDown={ e => ( e.key === 'e' || e.key === '.' ) && e.preventDefault() }
                    className="w-input-field px-6 py-2 border-2 border-neutral-500 placeholder:text-xs text-base"/>
                </div>
                <div className="flex gap-2 flex-col">
                    <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('email')}</label>
                    <input type="email" name="Email" placeholder={t('emailPlaceholder')} required value={emailValue} 
                    onChange={(e) => handleEmailChange(e)} onInput={e => validate(e)} ref={emailInputRef}
                    className={`w-input-field px-6 py-2 border-2
                    ${!emailValue ? "border-neutral-500" : emailValid ? 'border-green-600' : 'border-red-500'} 
                    placeholder:text-xs text-base outline-none`} />
                </div>
                </div>
                <div className="flex gap-2 flex-col w-full">
                  <label htmlFor="message" className="text-neutral-800 font-medium text-base">{t('message')}</label>
                  <textarea id="message" name="Message" placeholder={t('messagePlaceholder')} minLength={4} required rows="4" value={messageValue} onChange={(e) => handleMessageChange(e)}
                      className="px-6 py-3 border-2 border-neutral-500 placeholder:text-xs text-base">
                  </textarea>
                </div>
                <input type="submit" value={t('send')}
                className="bg-red-600 text-neutral-100 w-fit cursor-pointer
                font-medium text-xl px-12 py-2.5 mx-auto"/>
          </form>

            {/* pop up appears when successfully submit form */}
            <div className={`fixed right-1/2 translate-x-1/2 px-8 py-4 z-30
                bg-white dark:bg-semi-black transition-all duration-300 pointer-events-none 
                    ${ popUpVisible ? 'bottom-12 opacity-100' : 'opacity-0 bottom-0'} shadow-card-bold`}>
                <h1 className="text-neutral-800 font-semibold text-base leading-none z-30">
                  {t('popUpText')} 
                </h1>
            </div>
        </div>
    )
};

export default ContactForm;