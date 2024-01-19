import { Request, Response } from "express";

function extractError(errorDetails: any) {
  const errorData = errorDetails.map((detail: any) => {
    const { context, type } = detail;
    const fieldName = context && context.key && `${context.key.toLowerCase()}`;
    const translationKey = `${type.toUpperCase()}`.replace(".", "_");

    return {
      fieldName,
      translationKey,
    };
  });

  return errorData;
}

export function withValidation(schema: any) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      req: Request,
      res: Response
    ) {
      if (!schema) {
        console.warn("No schema provided");
      }

      if (schema.params) {
        const { error: paramsError } = schema.params.validate(req.params);
        if (paramsError) {
          const { details } = paramsError;
          const errorData = extractError(details);
          // return errorData[0].fieldName;
          throw new Error(errorData[0].fieldName); // Assuming you want to throw the fieldName as the error
        }
      }

      if (schema.body) {
        const { error: bodyError } = schema.body.validate(req.body);
        if (bodyError) {
          const { details } = bodyError;
          const errorData = extractError(details);
          // return errorData[0].fieldName;
          throw new Error(errorData[0].fieldName); // Assuming you want to throw the fieldName as the error
        }
      }

      if (schema.query) {
        const { error: queryError } = schema.query.validate(req.query);
        if (queryError) {
          const { details } = queryError;
          const errorData = extractError(details);
          throw new Error(errorData[0].fieldName); // Assuming you want to throw the fieldName as the error
        }
      }

      return originalMethod.apply(this, [req, res]);
    };

    return descriptor;
  };
}