'use client';
import React, { useEffect } from 'react';
import style from '@/styles/components/floatingCart.module.scss';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';
import {
  useGetCartQuery,
  useGuestCartListQuery,
  useCreateGuestUserMutation,
} from '@/redux/services/auth';

const FloatingCart = () => {
  const [createGuestUser] = useCreateGuestUserMutation();

  function generateShortUUID() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUUID = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUUID += characters.charAt(randomIndex);
    }
    return shortUUID;
  }

  const shortUUID = generateShortUUID();
  useEffect(() => {
    const checkGuestId = getCookie('guest_id');
    if (!checkGuestId) {
      if (typeof window !== 'undefined') {
        createGuestUser({ uuid: shortUUID })
          .unwrap()
          .then((res) => {
            setCookie('guest_id', shortUUID, {
              path: '/',
            });
          });
      }
    }
  }, []);
  const { data: cart } = useGetCartQuery();
  const { data: guestCartData } = useGuestCartListQuery();

  // console.log(guestCart);
  const token = getCookie('token');
  const router = useRouter();
  const handleRedirect = () => {
    if (token) {
      router.push('/cart');
    } else {
      router.push('/guest-cart');
    }
  };
  let renderCartCount = () => {
    return (
      <div className={style.cart_count}>
        <span>
          {cart?.data?.length
            ? cart?.data?.length
            : guestCartData?.data?.length
            ? guestCartData?.data?.length
            : null}
        </span>
      </div>
    );
  };
  return (
    <div className={style.cart_wrapper} onClick={handleRedirect} title={`Cart`}>
      <div className={style.cart}>
        <div className={style.cart_icon}>
          <img
            loading='lazy'
            height={28}
            width={23}
            style={{
              objectFit: 'cover',
            }}
            src='/common/bag.svg'
            alt='cart'
          />
        </div>
        {renderCartCount()}
      </div>
    </div>
  );
};

export default FloatingCart;
