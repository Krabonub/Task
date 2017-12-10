function generateMatrix(height,width){  //function witch generates double dimentional matrix witch contains randomly generated integer values from 0 to 1.
  let matrix=[];
  for(let i=0;i<height;i++){
    matrix[i]=[];
    for(let j=0;j<width;j++){
      matrix[i][j]=Math.floor(Math.random() * 2);
    }
  }
  return matrix;
}

function buildMatrixInElement(dom_element,matrix){  //function witch builds a table of matrix values inside chosen DOM element.
  dom_element.innerHTML = '';
  let tmp_tr,tmp_td;
  let tmp_table=document.createElement("table");
  for(let row of matrix){
    tmp_tr=document.createElement("tr");
    for(let item of row){
      tmp_td=document.createElement("td");
      tmp_td.innerText=item;
      tmp_tr.appendChild(tmp_td);
    }
    tmp_table.appendChild(tmp_tr);
  }
  dom_element.appendChild(tmp_table);
}

function findTheMaximalCombo(matrix){  //function witch finds the longest. sequense of 1's in a matrix rows
  let tmp_combo=0;
  let max_in_a_row=[];
  for(let row of matrix)
  {
    for(let item of row)
    {
      if(item)
      {
        tmp_combo++;
      }
      else
      {
        if(tmp_combo)
        {
           max_in_a_row.push(tmp_combo);
        }
        tmp_combo=0;
      }
    }
    if(tmp_combo)
    {
      max_in_a_row.push(tmp_combo);
    }
    tmp_combo=0;
  }
  return Math.max.apply(null,max_in_a_row);
}

function transposeMatrix(matrix){  //function witch transposes matrix.
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

document.getElementById("start").onclick=function(){ //function witch calls a row of another functions by clicking on button in order to find and show generated matrix and the longest sequence of 1's either row wise or column wise.
  let matrix_height;
  let matrix_width;
  if(document.getElementById("height").value>0){
    matrix_height=document.getElementById("height").value;
  }else{
    document.getElementById("height").value=1;
    matrix_height=1;
  }
  if(document.getElementById("width").value>0){
    matrix_width=document.getElementById("width").value;
  }else{
    document.getElementById("width").value=1;
    matrix_width=1;
  }
  let matrix=generateMatrix(matrix_height,matrix_width);
  buildMatrixInElement(document.getElementById("matrix_div"),matrix);
  let max_at_rows=findTheMaximalCombo(matrix);
  let max_at_columns=findTheMaximalCombo(transposeMatrix(matrix));
  document.getElementById("result").innerText=(Math.max(max_at_rows,max_at_columns))>=0?Math.max(max_at_rows,max_at_columns):"No 1's in a matrix";
};


