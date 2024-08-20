import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'

export const InstagramButton = () => {
  return (
    <Link
      href={'https://www.instagram.com/piercing_daryauo/'}
      className="cursor-pointer flex items-center justify-center"
      target="_blank"
    >
      <InstagramIcon />
    </Link>
  )
}
