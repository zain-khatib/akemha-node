import { HttpException, HttpStatus } from '@nestjs/common';
import * as config from 'config';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 204800, // in bytes
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(extname(file.originalname))) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: join(__dirname, '..', '..', 'public'),
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};