import React from "react";
import { FileUploadRowProps } from "../../../types/Props/Video/FileUploadRowProps";
import { FileRowHeader } from "./FileRowHeader";
import { ProtocolFields } from "./ProtocolFields";
import { CommentAndReady } from "./CommentAndReady";
import { useProtocolOptions } from "../../../hooks/student/protocols/useProtocolOptions";
import { useProtocolFlow } from "../../../hooks/student/ProtocolFlow/useProtocolFlow";

export const FileUploadRow: React.FC<FileUploadRowProps> = (props) => {
  const { fileItem, index, removeFile, ...rest } = props;
  const protocolOptions = useProtocolOptions();
  const protocolFlow = useProtocolFlow();

  return (
    <div className="border border-slate-200 rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <FileRowHeader fileItem={fileItem} index={index} removeFile={removeFile} />
      <div className="p-4 sm:p-5 bg-white space-y-5">
        <ProtocolFields
          fileItem={fileItem}
          index={index}
          protocolOptions={protocolOptions}
          protocolFlow={protocolFlow}
          {...rest}
        />
        <CommentAndReady
          fileItem={fileItem}
          index={index}
          updateFileComment={props.updateFileComment}
          updateFileReady={props.updateFileReady}
        />
      </div>
    </div>
  );
};