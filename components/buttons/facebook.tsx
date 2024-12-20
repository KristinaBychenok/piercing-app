import Link from 'next/link'

export const FacebookButton = () => {
  return (
    <Link
      href={'https://www.facebook.com/piercing.daryauo'}
      className="cursor-pointer flex items-center justify-center text-white hover:text-yellow-light active:text-yellow-default"
      target="_blank"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_291_4710)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.2 0H5.8C4.26174 0 2.78649 0.61107 1.69878 1.69878C0.61107 2.78649 0 4.26174 0 5.8V14.2C0 17.4 2.6 20 5.8 20H14.2C15.7383 20 17.2135 19.3889 18.3012 18.3012C19.3889 17.2135 20 15.7383 20 14.2V5.8C20 2.6 17.4 0 14.2 0ZM3.05442 3.05442C3.72955 2.37928 4.64522 2 5.6 2H14.4C16.39 2 18 3.61 18 5.6V14.4C18 15.3548 17.6207 16.2705 16.9456 16.9456C16.2705 17.6207 15.3548 18 14.4 18H5.6C3.61 18 2 16.39 2 14.4V5.6C2 4.64522 2.37928 3.72955 3.05442 3.05442ZM8.69452 6.937V8.314H7.68652V9.997H8.69452V15H10.7665V9.997H12.1565C12.1565 9.997 12.2875 9.19 12.3505 8.307H10.7745V7.157C10.7745 6.984 11.0005 6.753 11.2245 6.753H12.3525V5H10.8175C8.68744 5 8.69337 6.61761 8.69448 6.92L8.69452 6.937Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_291_4710">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  )
}
