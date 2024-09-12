/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { Icon } from '@trackunit/react-components';
import { useAtom } from 'jotai';
import { FileUploadAtom } from './FileUploadStore';

interface VehicleData {
  name: string;
  label: string;
  color: string;
  textColor: string;
  data: Array<{
    timestamp: string;
    weight: number;
    terrain: string;
    distanceKm: number;
    fuel: number;
  }>;
}

const FileUpload = () => {
  const [, setUploadedData] = useAtom(FileUploadAtom);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

  const handleIconClick = () => {
    // Trigger the hidden file input click when the icon is clicked
    if (fileInputRef) {
      fileInputRef?.current?.click();
    }
  };

  // Handle file upload and processing
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Safely access the first file
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Read the file content and process it
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer); // Type assertion
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Rebuild the original JSON structure
          const rebuiltJson = rebuildJson(json);
          setUploadedData(rebuiltJson);
          // console.log(rebuiltJson);
        }
      };

      reader.readAsArrayBuffer(file); // Read the file as array buffer
    }
  };

  const rebuildJson = (data: any[][]): VehicleData[] => {
    const headers = data[0]; // Get the headers from the first row
    const vehicles: VehicleData[] = [];
    data.slice(1).forEach((row) => {
      const [
        name,
        label,
        color,
        textColor,
        timestamp,
        weight,
        terrain,
        distanceKm,
        fuel,
      ] = row;

      let vehicle = vehicles.find((v) => v.name === name);

      // If the vehicle is not found, create a new entry
      if (!vehicle) {
        vehicle = {
          name,
          label,
          color,
          textColor,
          data: [],
        };
        vehicles.push(vehicle);
      }

      // Add the entry to the `data` array
      vehicle.data.push({
        timestamp,
        weight: Number(weight),
        terrain,
        distanceKm: Number(distanceKm),
        fuel: Number(fuel),
      });
    });

    return vehicles;
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        ref={fileInputRef} // Bind the input ref
        onChange={handleFileUpload}
      />

      {/* Icon to trigger the file upload */}
      <Icon
        name="DocumentPlus"
        onClick={handleIconClick}
        style={{ fontSize: '24px', cursor: 'pointer' }}
      />
    </div>
  );
};

export default FileUpload;
