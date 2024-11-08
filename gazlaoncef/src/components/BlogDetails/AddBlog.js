import React from 'react';
import {
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  Container,
} from 'reactstrap';

function AddBlog() {
  return (
    <Container style={{ 
      border: '2px solid black', /* Siyah çizgi */
      padding: '20px', /* İç boşluk */
      marginTop: '20px', /* Üstten boşluk */
      borderRadius: '5px' /* Köşeleri yuvarla */
    }}>
      <Form>
        <FormGroup>
          <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Blog Ekle</h3>
          <Label for="BlogTitle">Blog Başlığı</Label>
          <Input id="BlogTitle" name="title" placeholder="Blog Başlığı..." type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="BlogCategory">Blog Kategorisi</Label>
          <Input id="BlogCategory" name="category" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="BlogContentText">Blog İçeriği</Label>
          <Input id="BlogContentText" name="BlogText" type="textarea" />
        </FormGroup>
        <FormGroup>
          <Label for="PictureFileBlog">Görsel</Label>
          <Input id="PictureFileBlog" name="file" type="file" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default AddBlog;
