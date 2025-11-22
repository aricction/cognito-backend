export const successResponse = (message: string, data?: any) => ({
  status: 'success',
  message,
  data: data || null,
});
