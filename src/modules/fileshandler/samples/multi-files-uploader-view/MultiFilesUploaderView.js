import React, { Component } from 'react';
import Auth from '../../../auth/Auth';
import MultiFilesUploader from '../../client/components/multi-files-uploader/MultiFilesUploader';
import TableInfo from './TableInfo.json';
import UploadedImage from '../UploadedImage';
import Consts from "../../consts/Consts";
import './MultiFilesUploaderView.scss';
import '../Samples.scss';

export default class MultiFilesUploaderView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTable: false,
            uploadedImages: [],
            isSubmitDisabled: true,
            isUploaderDisabled: false
        };
    }

    onChange = (event) => {
        let name = (event.target && event.target.name) || null;
        let value = (event.target && event.target.value) || null;
        let isSubmitDisabled = true;
        if (isSubmitDisabled && value) isSubmitDisabled = false;
        this.setState({ [name]: value, isSubmitDisabled });
    }

    getFilesData = () => {
        const fieldsToSave = ['imgId'];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            if (this.state[field]) fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    upload = async () => {
        this.setState({ isSubmitDisabled: true, isUploaderDisabled: true });
        let filesData = this.getFilesData();
        console.log("about to upload files", filesData);

        let [pRes, pErr] = await Auth.superAuthFetch('/api/Images', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(filesData)
        });

        console.log("pRes", pRes);

        if (pErr) return console.log("ERR:", pErr);

        await this.previewUploadedImages(pRes);
    };

    getUploadedFilesIds = (filesUploadStatus, filterByType = Consts.FILE_TYPE_IMAGE) => {
        let fileIds = [];
        for (let fileKeys in filesUploadStatus) {
            let fileOrFiles = filesUploadStatus[fileKeys];

            const pushToFileIds = (file) => {
                if (file.status === Consts.FILE_ACCEPTED && file.type === filterByType) {
                    fileIds.push(file.id)
                }
            }

            if (Array.isArray(fileOrFiles)) {
                fileOrFiles.forEach(file => pushToFileIds(file));
            }
            else {
                pushToFileIds(fileOrFiles);
            }
        }

        return fileIds;
    }

    previewUploadedImages = async (postRes) => {
        if (!postRes || !postRes.filesUploadStatus) return;
        let uploadedFilesIds = this.getUploadedFilesIds(postRes.filesUploadStatus, Consts.FILE_TYPE_IMAGE);
        let filter = JSON.stringify({"where": {"id": {"inq": uploadedFilesIds}}});
        let [gRes, gErr] = await Auth.superAuthFetch('/api/Images?filter=' + filter);

        if (gErr) return console.log("ERR:", gErr);
        console.log("GET res", gRes);

        this.setState({ uploadedImages: gRes });
    }

    toggleTable = () => {
        let isTable = !this.state.isTable;
        this.setState({ isTable });
    }

    render() {
        let isSubmited = Object.keys(this.state.uploadedImages).length !== 0;

        return (
            <div className="multi-files-uploader-sample uploader-sample">

                <h1>Multi Files Uploader</h1>

                <div className="image-input-samples">

                    <div className="image-input-sample">
                        <MultiFilesUploader
                            name="imgId" // keyToSaveImgId
                            title="my-images"
                            category="my-images"
                            label="Drop your images"
                            onChange={this.onChange}
                            disabled={this.state.isUploaderDisabled}
                            type="image" // image, audio, video, file

                        // NOT SUPPORTED YET
                        // previewFiles={[accepted, rejected]}
                        // onDragEnter=""
                        // onDragLeave=""
                        // onDragOver=""
                        // onDrop=""
                        // onDropAccepted=""
                        // onDropRejected=""
                        // onFileDialogCancel=""
                        />
                    </div>
                </div>

                <div className="usage">
                    <p>import ImageUploader from '/src/modules/fileshandler/client/components/multi-files-uploader/MultiFilesUploader.js</p>
                    <p>{`<MultiFilesUploader
                        name="imgId"
                        title="my-images"
                        category="my-images"
                        label="Drop your images"
                        onChange={this.onChange}
                        disabled={this.state.isUploaderDisabled}
                        type="image" />`}</p>
                </div>

                <div className="description p-1">

                    {this.state.isTable && <div className="m-2 mt-4 props-details" dir='ltr'>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {TableInfo.thead.map((col, i) => <th key={i} scope="col">{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {TableInfo.tbody.map((row, i) =>
                                    <tr key={i}>
                                        <td>{row.Property}</td>
                                        <td>{row.Type}</td>
                                        <td>{row.Description}</td>
                                        <td>{row.Default}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>}

                    <button onClick={this.toggleTable}>{!this.state.isTable ? "Show props details" : "Show less"}</button>
                </div>



                <p className="explanation">
                    <strong>Note:</strong> In this example the Submit button uploads all the chosen images to Images model<br />
                    (without saving a reference image_id in another model like in "Upload image to relative model (by creating a new game)" sample).<br />
                    <strong>Notice:</strong> The MultiImageHandler does not support <em>required</em> prop.</p>

                {!isSubmited ?
                    <button onClick={this.upload} disabled={this.state.isSubmitDisabled}>Submit</button> :
                    <div className="uploaded-images">
                        {this.state.uploadedImages.map((uploadedImage, i) =>
                            <div key={i}>
                                <UploadedImage {...uploadedImage} />
                            </div>)}
                    </div>}
            </div>
        );
    }
}