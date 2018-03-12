import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        const html = this.props.html ? this.props.html:'';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onEditorStateChange (editorState) {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

        let content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.setState({
            editorState: editorState,
        });
        /**to set field in redux form  */
        this.props.input.onChange(content);
        
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>               
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />

            </div>
        );
    }
}

export default EditorConvertToHTML;