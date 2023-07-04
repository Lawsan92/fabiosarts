import React, { useRef, useState } from 'react';
import { sendForm } from '@emailjs/browser';

const MobileEmail = ({ setEmailForm }) => {

  const styles = {
    width: '50vw',
    transform: 'translateY(16px)',
    h3: {
      paddingLeft: 0,
      width: 'fit-content'
    }
  }

  const emailRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, emailRef.current, process.env.EMAILJS_PUBLIC_KEY)
    .then((result) => {
      console.log('result:', result.text);
    })
    .catch((err) => {
      console.log('err:', err.text);
    });
    alert('Email Sent')
    e.target.reset();

  };

  return (
    <div className="contact">
      <div className='contact_header'>
        <h1 className='contact_header_h1'>Contact Us</h1>
        <p className='contact_header_p' style={styles}>Please fill out the following form to contact us via email</p>
        <h3 className='contact_header_h3' style={styles.h3}>Call Us</h3>
      </div>
      <form className="email" ref={emailRef} onSubmit={sendEmail}>
        <div className='email_inputs_grid'>
          <div className='email_content'>
            <label for='' className='email_label'>Name</label>
              <input type='text' className='email_input' name='user_name'/>
          </div>
          <div className='email_content'>
            <label for='' className='email_label'>Email</label>
            <input type='email' className='email_input' name='user_email'/>
          </div>
          <div className='email_content'>
            <label for='' className='email_label'>Project</label>
            <input type='text' className='email_input' name='user_project'/>
          </div>
          <div className='email_content_message'>
            <label for='' className='email_label'>Message</label>
            <textarea className='email_input_textarea' name='user_message'/>
          </div>
          <input type='submit' value='Send Message' className='email_content_button' />
        </div>
      </form>
      <div className='contact_phone'>
        <p className='contact_phone_p'>(415) 370-8756</p>
      </div>
      <button className='contact_btn' onClick={() => {setEmailForm(false)}}>X</button>
    </div>
  );

}

export default MobileEmail;