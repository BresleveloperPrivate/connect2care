import React, { Component } from 'react';
import candle from '../icons/candle.svg'
import '../styles/imagesCollage.css'
// import { imageSize } from 'image-size';
import Auth from '../modules/auth/Auth'


const constImages = []

class HowItWorks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: [],
            imgTryArray: []
        }
    }


    componentDidMount = async () => {

        // let [meetings, err] = await Auth.superAuthFetch('/api/meetings?filter={"include":[{"relation":"fallens"}],"limit":"38"}', {
        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/get38Meetings', {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })
        if (err) {
            console.log(err)
        } else {
            let i = 0
            let meeting = 0
            while (constImages.length < 32) {
                if (meetings[meeting]) {
                    for (let j = 0; j < meetings[meeting].fallens.length; j++) {
                        if (constImages.length < 32 && !constImages.some(meetingObject => meetingObject.fallenId === meetings[meeting].fallens[j].id) && meetings[meeting].fallens[j].image_link) {
                            constImages.push(
                                {
                                    meetingId: meetings[meeting].id,
                                    fallenId: meetings[meeting].fallens[j].id,
                                    image: meetings[meeting].fallens[j].image_link,
                                    alt: meetings[meeting].fallens[j].firstName
                                }
                            )
                        }
                        // i++

                    }
                    meeting++
                }
                else {
                    constImages.push(null)
                    // i++
                }
            }
            let imgTryArray = []

            if (window.innerWidth <= 800) {
                this.setState({ images: constImages.slice(0, 12) })
                for (let i = 0; i < this.state.images.length; i++) {
                    imgTryArray.push(false)
                }
                this.setState({ imgTryArray })

            } else {
                for (let i = 0; i < constImages.length; i++) {
                    imgTryArray.push(false)
                }
                this.setState({ images: constImages, imgTryArray })
            }
        }


        window.addEventListener('resize', this.onResize);

    }

    onResize = () => {
        if (window.innerWidth <= 800) {
            let images = this.state.images
            images = constImages.slice(0, 12)
            this.setState({ images })
        } else {
            this.setState({ images: constImages })
        }
    }

    render() {
        return (

            <div className='containImagesCollage'>

                <div className='borderImagesCollage'>

                    <div className='topLabel'>
                        <div className='label'>
                            {this.props.t('ConnectRemember')}
                        </div>
                    </div>
                    <div className='container'>
                        {this.state.images.map((val, index) => {
                            if (val) {
                                return (
                                    <div key={index} style={{ gridArea: 'a' + Number(index + 1), margin: '0.5vw' }}>
                                        <img
                                            onClick={() => {
                                                this.props.history.push(`/meeting/${val.meetingId}`)
                                            }}

                                            onError={() => {
                                                if (this.state.imgTryArray) {
                                                    let imgTryArray = JSON.parse(JSON.stringify(this.state.imgTryArray))
                                                    imgTryArray[index] = candle
                                                    this.setState({ imgTryArray })
                                                }
                                            }}
                                            className='hoverImage pointer'
                                            src={this.state.imgTryArray && this.state.imgTryArray[index] ? this.state.imgTryArray[index] : val.image}
                                            alt={val.alt}
                                            style={{ filter: "grayscale(1)", padding: this.state.imgTryArray && this.state.imgTryArray[index] ? "1vh" : 0 }}
                                            width='100%'
                                            height='100%' />
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={index} className='noImage' style={{ gridArea: 'a' + Number(index + 1), margin: '0.5vw' }}>
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