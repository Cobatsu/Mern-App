import React from 'react';
import styled from 'styled-components';


const IconsWrapper = styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
`

const InnerIcon = styled.div` 
padding: 0 5px;
font-size:20px;
color:#ff6363;
`
//use padding in general instead of with or smth.

export const PermissionsNumbers = {
  REMOVE: 1,
  UPDATE: 2,
  ADD: 3,
  READ: 4,
}


export const hasPermission = (Permissions, CheckPermission) => {
  if (Permissions.indexOf(CheckPermission) != -1) {
    return true;
  } else {
    return false;
  }
}


export const IconPermission = ({permissions}) => {
  const PermissionList = permissions.map((value, index) => {

    if (value == 1) //REMOVE
    {
      return <InnerIcon key={value}><i className="fas fa-trash-alt"></i></InnerIcon>
    } else if (value == 2) //UPDATE
    {
      return <InnerIcon key={value}><i className="fas fa-edit"></i></InnerIcon>
    } else if (value == 3) //ADD
    {
      return <InnerIcon key={value}><i className="fas fa-plus-circle"></i></InnerIcon>
    } else {
      return null;
    }
  })

  return <IconsWrapper>{PermissionList}</IconsWrapper>
}


