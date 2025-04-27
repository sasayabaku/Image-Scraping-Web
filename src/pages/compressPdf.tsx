import { Upload } from '@mui/icons-material'
import { Box, Paper, Typography, Button } from '@mui/material'
import React, { ChangeEvent, DragEvent, useRef, useState } from 'react'

interface FileUploadProps {
  acceptedFileTypes?: string
}

const CompressPdf: React.FC<FileUploadProps> = ({ acceptedFileTypes }) => {
  const [files, setFiles] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0]
      setFiles(newFile)
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0]
      setFiles(newFile)
    }
  }

  const handleUpload = () => {
    console.log('アップロードするファイル', files)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 m-12">
      <div>
        <p>PDF 圧縮ツール</p>
      </div>
      <div>
        <Box className="flex flex-col gap-4 w-full max-w-lg">
          <Paper
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={acceptedFileTypes}
              className="hidden"
            />
            <Upload className="mx-auto text-blue-500 mb-2" />
            {files ? (
              <>
                <p>{files.name}</p>
              </>
            ) : (
              <>
                {' '}
                <Typography className="text-lg font-medium mb-1">
                  ファイルをドラッグ&ドロップ
                </Typography>
                <Typography className="text-gray-500 mb-2">
                  または、クリックしてファイルを選択
                </Typography>
              </>
            )}
            <Button
              variant="outlined"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              className="mt-2"
            >
              ファイル選択
            </Button>
          </Paper>

          <Button
            variant="contained"
            onClick={handleUpload}
            className="mt-4 bg-blue-500 text-white"
            disabled={files === undefined}
          >
            UPLOAD
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default CompressPdf
