import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const { id } = useParams();

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    setTitle(response.data.name);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await axios.put(`http://localhost:3000/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/');
    } catch (error) {
      console.log('ERROR CREATE PRODUCT >>>>>>>>> ', error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    <span className="file-label">
                      Choose a file
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : ('')}

          <div className="field">
            <div className="control">
              <button className="button is-success" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct;