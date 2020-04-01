import React, { Component } from 'react';
import '../styles/explanation.css'

class Image extends Component {

    render() {
        return (

            <div  
            style={{cursor: this.props.isOpen ? 'pointer' : 'auto'}}
            className = {this.props.className}>

                {this.props.array.length === 1 ?

                    <div style={{width: '11em', height: '14em'}}>
                        <img className='object-fit-cover-top' src={this.props.array[0]} width='100%' height='100%' />
                    </div>


                    : this.props.array.length === 2 ?

                    <div style={{width: '11em', height: '14em'}}>
                            <img className='object-fit-cover-top' src={this.props.array[0]} width='100%' height='50%' />
                            <img className='object-fit-cover-top' src={this.props.array[1]} width='100%' height='50%' />

                        </div>


                        : this.props.array.length === 3 ?

                            <div style={{width: '11em', height: '14em'}} >
                                <div style={{ display: 'flex', width: '100%', height: '50%' }}>
                                    <img className='object-fit-cover-top' src={this.props.array[0]} width='50%' height='100%' />
                                    <img className='object-fit-cover-top' src={this.props.array[1]} width='50%' height='100%' />
                                </div>
                                <div style={{ width: '100%', height: '50%' }}>
                                    <img className='object-fit-cover-top' src={this.props.array[2]} width='100%' height='100%' />
                                </div>
                            </div>


                            : this.props.array.length >= 4 ?
                                <div style={{ width: '11em', height: '14em', display: 'flex', flexDirection: 'column' }}>

                                    <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                        <img className='object-fit-cover-top' src={this.props.array[0]} width='50%' height='100%' />
                                        <img className='object-fit-cover-top' src={this.props.array[1]} width='50%' height='100%' />
                                    </div>

                                    <div style={{ display: 'flex', width: '100%', height: '50%', display: 'flex' }}>
                                        <img className='object-fit-cover-top' src={this.props.array[2]} width='50%' height='100%' />
                                        <img className='object-fit-cover-top' src={this.props.array[3]} width='50%' height='100%' />
                                    </div>

                                </div>


                                : null
                }

            </div>

        );
    }
}

export default Image;