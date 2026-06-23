import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

describe('CreateEmployeeDto', () => {
  it('should validate a complete and correct payload', async () => {
    const payload = {
      eid: 'E123',
      employee_name: 'John Doe',
      department: 'Engineering',
      salary: '75000',
      doj: '2024-01-15',
      email: 'john.doe@example.com',
      password: 'strongPassword123',
    };

    const dto = plainToInstance(CreateEmployeeDto, payload);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.salary).toBe(75000);
  });

  it('should fail validation when required fields are missing or invalid', async () => {
    const payload = {
      eid: '',
      employee_name: 'John Doe',
      salary: 'not-a-number',
      doj: 'invalid-date',
      email: 'not-an-email',
      password: '',
    };

    const dto = plainToInstance(CreateEmployeeDto, payload);
    const errors = await validate(dto);

    const properties = errors.map((err) => err.property);

    expect(properties).toContain('eid');
    expect(properties).toContain('department');
    expect(properties).toContain('salary');
    expect(properties).toContain('doj');
    expect(properties).toContain('email');
    expect(properties).toContain('password');
    expect(errors.length).toBeGreaterThanOrEqual(5);
  });
});
