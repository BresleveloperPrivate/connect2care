import React from 'react';
import candle from '../icons/candle.png'
import '../styles/explanation.css'

function Image(props) {

    return (

        <div
            className={props.className}>

            {props.array.length === 1 ?

                <div style={{ width: props.width, height: props.height }}>
                    <img alt="alt" className='object-fit-cover-top' src={props.array[0].fallens.image_link || candle} width='100%' height='100%' />
                </div>


                : props.array.length === 2 ?

                    <div style={{ width: props.width, height: props.height }}>
                        <img alt="alt" className='object-fit-cover-top' src={props.array[0].fallens.image_link || candle} width='100%' height='50%' />
                        <img alt="alt" className='object-fit-cover-top' src={props.array[1].fallens.image_link || candle} width='100%' height='50%' />

                    </div>


                    : props.array.length === 3 ?

                        <div style={{ width: props.width, height: props.height }} >
                            <div style={{ display: 'flex', width: '100%', height: '50%' }}>
                                <img alt="alt" className='object-fit-cover-top' src={props.array[0].fallens.image_link || candle} width='50%' height='100%' />
                                <img alt="alt" className='object-fit-cover-top' src={props.array[1].fallens.image_link || candle} width='50%' height='100%' />
                            </div>
                            <div style={{ width: '100%', height: '50%' }}>
                                <img alt="alt" className='object-fit-cover-top' src={props.array[2].fallens.image_link || candle} width='100%' height='100%' />
                            </div>
                        </div>


                        : props.array.length >= 4 ?
                            <div style={{ width: props.width, height: props.height, display: 'flex', flexDirection: 'column' }}>

                                <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                    <img alt="alt" className='object-fit-cover-top' src={props.array[0].fallens.image_link || candle} width='50%' height='100%' />
                                    <img alt="alt" className='object-fit-cover-top' src={props.array[1].fallens.image_link || candle} width='50%' height='100%' />
                                </div>

                                <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                    <img alt="alt" className='object-fit-cover-top' src={props.array[2].fallens.image_link || candle} width='50%' height='100%' />
                                    <img alt="alt" className='object-fit-cover-top' src={props.array[3].fallens.image_link || candle} width='50%' height='100%' />
                                </div>

                            </div>


                            :
                            <div style={{ width: props.width, height: props.height }}>
                                <img alt="alt" className='object-fit-cover-top' src={candle} width='100%' height='100%' />
                            </div>

            }

        </div>

    );
}


export default Image;