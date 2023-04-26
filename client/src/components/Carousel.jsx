import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const CarouselComponent = () => {
    return (
        <Carousel autoPlay infiniteLoop className='carousel_login h-full' showThumbs={false}>
            {images.map((item, i) => (
                <div className='relative h-full'>
                    <img className='h-full rounded-2xl bg-cover object-cover' key={i} src={item.imgPath} alt={item.label} />
                    <div className='absolute top-0 left-0 z-20 card_carousel'>
                        <h1 className='text-lg'>{item.label}</h1>
                        <p className='text-xs'>{item.label}</p>
                    </div>
                </div>
            ))}
        </Carousel >
    );
}

export default CarouselComponent