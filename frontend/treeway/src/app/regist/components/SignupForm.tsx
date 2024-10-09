'use client'

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import styles from '../page.module.scss';
import Button from '@/app/common/Button';
import FormField from "./FormField";
import DateField from './DateField';
import ImageUpload from './ImageUpload';
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slice/authSlice";

export default function SignupForm() {
    const [memberId, setMemberId] = useState(0);
    const [imageFileName, setImageFileName] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const userDetails = getCookie('customUserDetails');

        if (userDetails) {
            const { id: memberId, email: userEmail, name: userName } = JSON.parse(userDetails as string);
            setMemberId(memberId);
            setEmail(userEmail);
            setName(userName);
        }
    }, []);

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(e.target.value)) {
            setPhoneNumber(e.target.value);
        }
    };

    const handleSubmit = async () => {
        if (!birthDate || !phoneNumber) {
            alert('생년월일과 전화번호를 입력해주세요.');
            return;
        }

        const signupData = {
            memberId: memberId,  // 쿠키에서 가져온 memberId
            profileImg: imageFileName, // 파일명(string)
            birthDate: birthDate,      // 생년월일(string)
            phoneNumber: phoneNumber   // 전화번호(string)
        };
    
        try {
            console.log(signupData)
            const response = await fetch('https://j11b107.p.ssafy.io/api/member/sign-up-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`회원가입 요청 실패: ${errorText}`);
            }
    
            dispatch(logIn({
                memberId: memberId,
                username: name,
                email: email,
            }));

            router.push('/main');
    
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <ImageUpload onFileSelect={(file) => setImageFileName(file?.name || '')} />
            <FormField
                label="이메일"
                htmlFor="email"
                type="email"
                value={email}
                onChange={() => { }}
                disabled={true}
            />
            <FormField
                label="이름"
                htmlFor="name"
                type="name"
                value={name}
                onChange={() => { }}
                disabled={true}
            />
            <DateField
                label="생년월일"
                htmlFor="date"
                value={birthDate}
                onChange={handleBirthDateChange}
            />
            <div className={styles.formAndButton}>
                <FormField
                    label="휴대전화"
                    htmlFor="phone"
                    type="text"
                    placeholder='숫자만 입력하세요'
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            <div className={styles.submitBtn}>
                <Button
                    content='회원가입'
                    size='large'
                    colorType='blue'
                    onClick={handleSubmit}
                    type='button' />
            </div>
        </form>
    );
}