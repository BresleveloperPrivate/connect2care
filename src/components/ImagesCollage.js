import React, { Component } from 'react';
import candle from '../icons/candle.svg'
import '../styles/imagesCollage.css'
import { imageSize } from 'image-size';

const constImages = []
class HowItWorks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }


    componentDidMount = () => {


        let i = 0
        while (i < 32) {
            if (constImages[i]) {
                constImages.push(constImages[i])
            }
            else{
                constImages.push(null)
            }
            i++
        }

        if (window.innerWidth <= 550) {
            this.setState({ images: constImages.slice(0, 10) })
        } else {
            this.setState({ images:constImages })
        }
        window.addEventListener('resize', this.onResize);

    }

    onResize = () => {
        if (window.innerWidth <= 550) {
            let images = this.state.images
            images = constImages.slice(0, 10)
            this.setState({ images })
        } else {
            this.setState({ images:constImages })
        }
    }

    render() {
        return (

            <div className='containImagesCollage'>

                <div className='borderImagesCollage'>

                    <div className='topLabel'>
                        <div className='label'>מתחברים וזוכרים. לזכרם.</div>
                    </div>


                    <div className='container'>

                        {this.state.images.map((val, index) => {

                            if (val) {
                                return (
                                    <div style={{ gridArea: 'a' + Number(index + 1), margin: '0.5vw' }}> <img className='hoverImage pointer' src='https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg' width='100%' height='100%' /></div>

                                )
                            }
                            else {
                                return (

                                    <div className='noImage' style={{ gridArea: 'a' + Number(index + 1), margin: '0.5vw' }}>
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