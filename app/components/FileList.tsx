import { useEffect, useState } from 'react'

const FileList = ({refresh}) => {

    const [objects, setObjects] = useState([]);

    const listFiles = async () => {
        
        try {

            const res = await fetch('/api/listObjects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            console.log("This is data")

            const array = data.Contents.shift();
            console.log(array)
            setObjects(data.Contents);

        } catch (error) {
            console.error(error);
            // alert("Error uploading file: " + error.message); // Inform user about the error
        }
        
    }

    useEffect(() => {
        listFiles();
    }, [refresh])

  return (
    <div>
        <ul>   
            {objects.map((object, index) => (
                <li key={index}>{object.Key.replaceAll('bestguide', '')}</li>
            ))} 
        </ul>
    </div>
  )
}

export default FileList