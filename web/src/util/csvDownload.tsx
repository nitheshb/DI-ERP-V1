import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useCSVDownloader } from 'react-papaparse'

import { prettyDateTime } from './dateConverter'

export default function CSVDownloader({ downloadRows, fromLeadsBank = false }) {
  const { CSVDownloader, Type } = useCSVDownloader()
  console.log('i was clicked')
  let downloadData
  if (fromLeadsBank) {
    downloadData = downloadRows.map((item) => {
      return {
        ...item,
        cT: prettyDateTime(item.cT),
      }
    })
  }

  return (
    <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      data={fromLeadsBank ? downloadData : downloadRows}
    >
      <Tooltip title={`Download ${downloadRows.length} Rows`}>
        <IconButton>
          {/* style={{ background: '#f9f9f9' }} */}
          <DownloadTwoToneIcon style={{ height: '20px', width: '20px' }} />
        </IconButton>
      </Tooltip>
    </CSVDownloader>
  )
}
