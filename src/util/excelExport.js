import * as XLSX from 'xlsx'

const excelDown = (rowData) => {
  // 엑셀 워크시트로 json 내보내기, 배열만 가능
  const dataWS = XLSX.utils.json_to_sheet(rowData)
  // 엑셀의 workbook(엑셀파일에 지정된 이름)을 만든다
  const wb = XLSX.utils.book_new()
  // workbook에 워크시트 추가, 시트명은 'peopleData'
  XLSX.utils.book_append_sheet(wb, dataWS, 'sheet')
  // 엑셀 파일을 내보낸다. 엑셀 파일 저장명은 'people.xlsx'
  XLSX.writeFile(wb, 'sheet.xlsx')
}

export default excelDown
