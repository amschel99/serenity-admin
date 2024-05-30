/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveReading } from "../api";
const stepworks = [
  "Step one",
  "Step two",
  "Step three",
  "Step four",
  "Step five",
  "Step six",
  "Step seven",
  "Step eight",
  "Step nine",
  "Step ten",
  "Step eleven",
  // Add more locations as needed
];

function Reading() {
  const [formData, setFormData] = useState({
    stepworkName: "",
    stepworkTitle: "",
    stepworkDescription: "",
    subtitles: [],
  });

  const selectedNodeRef = useRef(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      stepworkName: value,
    }));
  };

  const handleSubtitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newSubtitles = formData.subtitles.map((subtitle: any, i) =>
      i === index ? { ...subtitle, [name]: value } : subtitle
    );
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      subtitles: newSubtitles,
    }));
  };

  const handleReadingChange = (
    subtitleIndex: number,
    readingIndex: any,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newSubtitles = formData.subtitles.map((subtitle: any, i) => {
      if (i === subtitleIndex) {
        const newReadings = subtitle.readings.map((reading: any, j: any) =>
          j === readingIndex ? { ...reading, [name]: value } : reading
        );
        return { ...subtitle, readings: newReadings };
      }
      return subtitle;
    });
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      subtitles: newSubtitles,
    }));
  };

  const addSubtitle = () => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      subtitles: [...prevFormData.subtitles, { title: "", readings: [] }],
    }));
  };

  const addReading = (subtitleIndex: number) => {
    const newSubtitles = formData.subtitles.map((subtitle: any, i) => {
      if (i === subtitleIndex) {
        return {
          ...subtitle,
          readings: [...subtitle.readings, { content: "", questions: [] }],
        };
      }
      return subtitle;
    });
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      subtitles: newSubtitles,
    }));
  };

  const addQuestion = (subtitleIndex: number, readingIndex: any) => {
    const newSubtitles = formData.subtitles.map((subtitle: any, i) => {
      if (i === subtitleIndex) {
        const newReadings = subtitle.readings.map(
          (reading: { questions: any }, j: any) => {
            if (j === readingIndex) {
              return { ...reading, questions: [...reading.questions, ""] };
            }
            return reading;
          }
        );
        return { ...subtitle, readings: newReadings };
      }
      return subtitle;
    });
    setFormData((prevFormData): any => ({
      ...prevFormData,
      subtitles: newSubtitles,
    }));
  };

  const handleQuestionChange = (
    subtitleIndex: number,
    readingIndex: any,
    questionIndex: any,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const newSubtitles = formData.subtitles.map((subtitle: any, i) => {
      if (i === subtitleIndex) {
        const newReadings = subtitle.readings.map(
          (reading: { questions: any[] }, j: any) => {
            if (j === readingIndex) {
              const newQuestions = reading.questions.map(
                (question: any, k: any) =>
                  k === questionIndex ? value : question
              );
              return { ...reading, questions: newQuestions };
            }
            return reading;
          }
        );
        return { ...subtitle, readings: newReadings };
      }
      return subtitle;
    });
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      subtitles: newSubtitles,
    }));
  };

  const handleSave = async () => {
    const response = await saveReading(formData);
    if (response.status === 201) {
      alert("Success");
    } else {
      alert("There was an error");
    }
    console.log("Response", response);
  };

  return (
    <div
      className="form-container"
      style={{ marginTop: "100px", maxHeight: "100vh", overflowY: "scroll" }}
    >
      <ToastContainer />
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Add stepwork
      </Typography>
      <form>
        <TextField
          label="Stepwork title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="stepworkTitle"
          value={formData.stepworkTitle}
          onChange={handleInputChange}
        />

        <Autocomplete
          options={stepworks}
          value={formData.stepworkName}
          onChange={handleAutocompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stepwork name"
              variant="outlined"
              fullWidth
              margin="normal"
              ref={selectedNodeRef}
            />
          )}
        />

        <TextField
          multiline
          label="Stepwork description"
          fullWidth
          margin="normal"
          name="stepworkDescription"
          value={formData.stepworkDescription}
          onChange={handleInputChange}
        />

        <div style={{ margin: "20px 0" }}>
          <Button variant="contained" color="primary" onClick={addSubtitle}>
            Add Subtitle
          </Button>
        </div>

        {formData.subtitles.map((subtitle: any, subtitleIndex) => (
          <div key={subtitleIndex} style={{ marginBottom: "20px" }}>
            <TextField
              label="Subtitle Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={subtitle.title}
              onChange={(e) => handleSubtitleChange(subtitleIndex, e)}
            />
            {subtitle.readings.map(
              (
                reading: { content: unknown; questions: any[] },
                readingIndex: React.Key | null | undefined
              ) => (
                <div key={readingIndex} style={{ marginBottom: "20px" }}>
                  <TextField
                    label="Reading Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="content"
                    value={reading.content}
                    onChange={(e) =>
                      handleReadingChange(subtitleIndex, readingIndex, e)
                    }
                  />
                  {reading.questions.map(
                    (question: unknown, questionIndex: any) => (
                      <TextField
                        key={questionIndex}
                        label={`Question ${questionIndex + 1}`}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={question}
                        onChange={(e) =>
                          handleQuestionChange(
                            subtitleIndex,
                            readingIndex,
                            questionIndex,
                            e
                          )
                        }
                      />
                    )
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addQuestion(subtitleIndex, readingIndex)}
                  >
                    Add Question
                  </Button>
                </div>
              )
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => addReading(subtitleIndex)}
            >
              Add Reading
            </Button>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          {/* <Button variant="contained" color="secondary">
            Edit
          </Button> */}
        </div>
      </form>
    </div>
  );
}

export default Reading;
