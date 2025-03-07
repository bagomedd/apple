import { useRef } from 'react';

export function RegisterPage() {
    const emailValue = useRef<string>('');
    const emailElement = useRef<HTMLInputElement | null>(null);
    const loginValue = useRef<string>('');
    const loginElement = useRef<HTMLInputElement | null>(null);
    const passwordValue = useRef<string>('');
    const passwordElement = useRef<HTMLInputElement | null>(null);


    async function submitHandler() {
        emailValue.current = emailElement.current!.value;
        loginValue.current = loginElement.current!.value;
        passwordValue.current = passwordElement.current!.value;
        const chmo = [{
            "email": emailValue.current,
            "username": loginValue.current,
            "password": passwordValue.current
        }]
        let json_info = JSON.stringify(chmo);
        console.log(json_info);

        fetch('http://192.168.132.141:8080/api/reg', {
            "method": "POST",
            "body": json_info,
            "headers": { "Content-type": "application/json" }
        });
    }



    return (
        <div className="regisration-page">
            <div className="window">
                <form onSubmit={submitHandler} >
                    <input type="text" ref={emailElement} />
                    <input type="text" ref={loginElement} />
                    <input type="text" ref={passwordElement} />
                    <input type="button" onClick={submitHandler} />
                </form >
            </div>
        </div>
    );
}