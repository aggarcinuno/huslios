import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding: 5px;
  align-content: center;
  padding: 5px;
 
`;

export const Card = styled.View`
  
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    
    
`;

export const UserInfo = styled.View`
    marginLeft: 5px;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;
    
`;

export const UserImg = styled.Image`
    marginTop: 1px;
    width: 28px;
    height: 28px;
    border-radius: 25px;
    
`;

export const UserInfoText = styled.View`
    flex-direction:column;
    justify-content: center;
    margin-left: 10px;
`;

export const PostOptionsComp = styled.View`
    position: absolute;
    top: 30px;
    right: 30px;

`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    font-family: 'Lato-Bold';
    color: #000;
    

`;

export const PostTime = styled.Text`
    font-size: 10px;
    font-family: 'Lato-Bold';
    color: #B9B9B9;
    
`;

export const PostText = styled.Text`
    font-size: 14px;
    font-family: 'Lato-Bold';
    padding-left: 15px;
    padding-right: 15px;
    color: #000;
    font-weight:bold;
    
`;

export const CommentText = styled.Text`
    font-size: 14px;
    font-family: 'Lato-Regular';
    padding-left: 15px;
    padding-right: 15px;
    color: #B9B9B9;
`;

export const PostImg = styled.Image`
    width: 100%;
    height  : 500px;
    margin-top: 0px;
    border-radius: 10px;
`;

