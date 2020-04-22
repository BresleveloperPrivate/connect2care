import React, { useEffect, useState } from 'react';
// import fallenNotExistPic from '../icons/fallenNotExistPic.png'
import fallenNotExistPic from '../icons/fallenNotExistPic.jpg'
import '../styles/explanation.css'

const Image = (props) => {

    const [imgCorrect, setImgCorrect] = useState();

    useEffect(() => {
        let correct = []
        for (let i = 0; i < props.array.length; i++) {
            correct.push(false)
        }
        setImgCorrect(correct)
    }, []);

    const setImg = (index, value) => {
        let allImg = JSON.parse(JSON.stringify(imgCorrect))
        allImg[index] = value
        setImgCorrect(allImg)
    }



    return (

        <div
            className={props.className}>

            {props.array.length === 1 ?

                <div style={{ width: props.width, height: props.height }}>
                    <img onError={() => imgCorrect && imgCorrect.length && setImg(0, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[0] ? fallenNotExistPic : (props.array[0].fallens.image_link || fallenNotExistPic)} style={props.array[0].fallens.image_link && imgCorrect && !imgCorrect[0] ? { filter: "grayscale(1)" } : {}} width='100%' height='100%' />
                </div>


                : props.array.length === 2 ?

                    <div style={{ width: props.width, height: props.height }}>
                        <img onError={() => imgCorrect && imgCorrect.length && setImg(0, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[0] ? fallenNotExistPic : (props.array[0].fallens.image_link || fallenNotExistPic)} style={props.array[0].fallens.image_link && imgCorrect && !imgCorrect[0] ? { filter: "grayscale(1)" } : {}} width='100%' height='50%' />
                        <img onError={() => imgCorrect && imgCorrect.length && setImg(1, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[1] ? fallenNotExistPic : (props.array[1].fallens.image_link || fallenNotExistPic)} style={props.array[1].fallens.image_link && imgCorrect && !imgCorrect[1] ? { filter: "grayscale(1)" } : {}} width='100%' height='50%' />

                    </div>


                    : props.array.length === 3 ?

                        <div style={{ width: props.width, height: props.height }} >
                            <div style={{ display: 'flex', width: '100%', height: '50%' }}>
                                <img onError={() => imgCorrect && imgCorrect.length && setImg(0, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[0] ? fallenNotExistPic : (props.array[0].fallens.image_link || fallenNotExistPic)} style={props.array[0].fallens.image_link && imgCorrect && !imgCorrect[0] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                                <img onError={() => imgCorrect && imgCorrect.length && setImg(1, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[1] ? fallenNotExistPic : (props.array[1].fallens.image_link || fallenNotExistPic)} style={props.array[1].fallens.image_link && imgCorrect && !imgCorrect[1] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                            </div>
                            <div style={{ width: '100%', height: '50%' }}>
                                <img onError={() => imgCorrect && imgCorrect.length && setImg(2, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[2] ? fallenNotExistPic : (props.array[2].fallens.image_link || fallenNotExistPic)} style={props.array[2].fallens.image_link && imgCorrect && !imgCorrect[2] ? { filter: "grayscale(1)" } : {}} width='100%' height='100%' />
                            </div>
                        </div>


                        : props.array.length >= 4 ?
                            <div style={{ width: props.width, height: props.height, display: 'flex', flexDirection: 'column' }}>

                                <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                    <img onError={() => imgCorrect && imgCorrect.length && setImg(0, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[0] ? fallenNotExistPic : (props.array[0].fallens.image_link || fallenNotExistPic)} style={props.array[0].fallens.image_link && imgCorrect && !imgCorrect[0] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                                    <img onError={() => imgCorrect && imgCorrect.length && setImg(1, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[1] ? fallenNotExistPic : (props.array[1].fallens.image_link || fallenNotExistPic)} style={props.array[1].fallens.image_link && imgCorrect && !imgCorrect[1] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                                </div>

                                <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                    <img onError={() => imgCorrect && imgCorrect.length && setImg(2, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[2] ? fallenNotExistPic : (props.array[2].fallens.image_link || fallenNotExistPic)} style={props.array[2].fallens.image_link && imgCorrect && !imgCorrect[2] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                                    <img onError={() => imgCorrect && imgCorrect.length && setImg(3, fallenNotExistPic)} alt="alt" className='object-fit-cover-top' src={imgCorrect && imgCorrect[3] ? fallenNotExistPic : (props.array[3].fallens.image_link || fallenNotExistPic)} style={props.array[3].fallens.image_link && imgCorrect && !imgCorrect[3] ? { filter: "grayscale(1)" } : {}} width='50%' height='100%' />
                                </div>

                            </div>


                            :
                            <div style={{ width: props.width, height: props.height }}>
                                <img alt="alt" className='object-fit-cover-top' src={fallenNotExistPic} width='100%' height='100%' />
                            </div>

            }

        </div>

    );
}


export default Image;