import React, { Component } from 'react';
import candle from '../icons/candle.svg'
import '../styles/imagesCollage.css'
import { imageSize } from 'image-size';

const image = []
class HowItWorks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: []
        }
    }
    componentDidMount = () => {
        let i = 0
        while (i < 32) {
            if (i % 5 == 0) {
                image.push(3)
            }
            else if (i % 3 == 0) {
                image.push(2)
            }
            else if (i % 2 == 0) {
                image.push(1)
            }
            else {
                image.push(0)
            }
            i++
        }
        this.setState({ image })

    }

    render() {
        return (

            <div className='containImagesCollage'>

                <div className='borderImagesCollage'>

                    <div className='topLabel'>
                        <div className='label'>מתחברים וזוכרים. לזכרם.</div>
                    </div>


                    <div className='container'>

                        {image.map((val, index) => {
                            if (val == 1) {
                                return (
                                    <div style={{ gridArea: 'a' + Number(index + 1) }}> <img className='hoverImage' src='https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg' width='100%' height='100%' /></div>

                                )
                            }
                            else if (val == 2) {
                                return (

                                    <div style={{ gridArea: 'a' + Number(index + 1) }}> <img className='hoverImage' src='https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' width='100%' height='100%' /></div>
                                )
                            }
                            else if (val == 3) {
                                return (

                                    <div style={{ gridArea: 'a' + Number(index + 1) }}> <img className='hoverImage' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPrHLeU5_Ic3fTNymLhINgmM11kxPYilKF8JhLfa9IjzXBOg7c&usqp=CAU' width='100%' height='100%' /></div>
                                )
                            }
                            else {
                                return (

                                    <div className='noImage' style={{ gridArea: 'a' + Number(index + 1) }}>
                                    </div>
                                )
                            }
                        })}

                    </div>

                    <div className='bottomLabel'>
                        <div className='label' style={{ height: '5vw', width: '3.6vw' }}>
                            <img src={candle} />

                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default HowItWorks;