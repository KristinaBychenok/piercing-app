import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'

export const InstagramButton = () => {
  return (
    <Link
      href={'https://www.instagram.com/piercing_daryauo/'}
      className="cursor-pointer flex items-center justify-center text-white hover:text-yellow-light active:text-yellow-default"
      target="_blank"
    >
      <InstagramIcon />
    </Link>
  )
}
